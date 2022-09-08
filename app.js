require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movies');
const { handleError } = require('./utils/handleError');
const NotFound = require('./errors/not-found');
const auth = require('./middlewares/auth');
const { checkCorseError } = require('./utils/checkCorseError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(checkCorseError);

app.use(express.json());

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  });
  console.log('moviesdb connect');
};

main().catch((err) => {
  console.log(err);
});

app.use(requestLogger);

app.use(userRouter);
app.use(auth);
app.use(movieRouter);
app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`);
});
