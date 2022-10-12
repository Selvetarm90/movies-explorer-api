const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { regExpUrl, regExpId } = require('../utils/constants');

movieRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .pattern(regExpUrl),
    trailerLink: Joi.string().required()
      .pattern(regExpUrl),
    thumbnail: Joi.string().required()
      .pattern(regExpUrl),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRouter.get('/movies', getMovies);

movieRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().pattern(regExpId).required(),
  }),
}), deleteMovie);

module.exports = { movieRouter };
