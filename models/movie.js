const mongoose = require('mongoose');
const { regExpUrl } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, 'Необходимо ввести название фильма'],
  },
  nameEN: {
    type: String,
    required: [true, 'Необходимо ввести название фильма'],
  },
  director: {
    type: String,
    required: [true, 'Необходимо ввести Режиссёра'],
  },
  country: {
    type: String,
    required: [true, 'Необходимо ввести страну создания'],
  },
  duration: {
    type: Number,
    required: [true, 'Необходимо ввести длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Необходимо ввести год выпуска'],
  },
  description: {
    type: String,
    required: [true, 'Необходимо ввести описание'],
  },
  image: {
    type: String,
    required: [true, 'Необходимо ввести ссылку на постер'],
    validate: {
      validator(v) {
        return regExpUrl.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Необходимо ввести ссылку на трейлер'],
    validate: {
      validator(v) {
        return regExpUrl.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Необходимо ввести ссылку на мини постер'],
    validate: {
      validator(v) {
        return regExpUrl.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
