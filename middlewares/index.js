const errorMiddlewares = require('./error');
const validUser = require('./validUser');
const createToken = require('./createToken');
const validLogin = require('./validLogin');

module.exports = {
  errorMiddlewares,
  validUser,
  createToken,
  validLogin,
};
