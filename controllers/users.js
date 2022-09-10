const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  JWT_SECRET_DEFAULT,
} = require('../utils/constants');

const ConflictError = require('../errors/conflict-error');
const BadRequetError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((data) => {
      const user = data.toObject();
      delete user.password;
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с заданным ID не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEFAULT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
