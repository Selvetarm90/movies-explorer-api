const INTERNAL_SERVER_ERROR = 500;
const MONGO_URL_DEV = 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_DEFAULT = 'new-secret-key';
const regExpUrl = /^((https|http):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
const regExpId = /^[0-9a-fA-F]{24}$/;

module.exports = {
  INTERNAL_SERVER_ERROR,
  JWT_SECRET_DEFAULT,
  MONGO_URL_DEV,
  regExpUrl,
  regExpId,
};
