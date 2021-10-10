const AuthMiddleware = require('./AuthMiddleware');
const ErrorMiddleware = require('./ErrorMiddleware');
const LoginMiddleware = require('./LoginMiddleware');
const UserMiddleware = require('./UserMiddleware');

module.exports = {
  ErrorMiddleware,
  UserMiddleware,
  LoginMiddleware,
  AuthMiddleware,
};
