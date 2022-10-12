require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { handleError } = require('./utils/handleError');
const NotFound = require('./errors/not-found');
const { checkCorseError } = require('./utils/checkCorseError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL_DEV } = require('./utils/constants');
const { allRouters } = require('./routes');

const { PORT = 3001, MONGO_URL = MONGO_URL_DEV } = process.env;

const app = express();

app.use(checkCorseError);

app.use(express.json());

const main = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
  });
  console.log('moviesdb connect');
};

main().catch((err) => {
  console.log(err);
});

app.use(requestLogger);
app.use(allRouters);
app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`);
});
