const Movie = require('../models/movie');
const BadRequetError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');

module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм по указанному ID не найден');
      }
      if (req.user._id.toString() !== movie.owner.toString()) {
        throw new Forbidden('Невозможно удалить чужой фильм');
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм удален', data: movie }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};
