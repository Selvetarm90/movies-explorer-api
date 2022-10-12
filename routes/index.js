const allRouters = require('express').Router();
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const auth = require('../middlewares/auth');

allRouters.use(userRouter);
allRouters.use(auth);
allRouters.use(movieRouter);

module.exports = { allRouters };
