const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { regExpUrl, regExpId } = require('../utils/constants');

movieRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    country: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(3).max(4).required(),
    description: Joi.string().min(2).max(200).required(),
    image: Joi.string().required()
      .pattern(regExpUrl),
    trailerLink: Joi.string().required()
      .pattern(regExpUrl),
    thumbnail: Joi.string().required()
      .pattern(regExpUrl),
    movieId: Joi.string().required()
      .pattern(regExpId),
  }),
}), createMovie);
movieRouter.get('/movies', getMovies);
movieRouter.delete('/movies/:movieId', deleteMovie);

module.exports = { movieRouter };
