const userRouter = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getUser,
  updateProfile,
  createUser,
  login,
} = require('../controllers/users');

userRouter.post('/signup', createUser);
userRouter.post('/signin', login);
userRouter.get('/users/me', auth, getUser);
userRouter.patch('/users/me', auth, updateProfile);

module.exports = { userRouter };
