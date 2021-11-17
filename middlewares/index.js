const errorMiddlewares = require('./error');
const validUser = require('./validUser');
const createToken = require('./createToken');
const validLogin = require('./validLogin');
const validJWT = require('./validJWT');

module.exports = {
  errorMiddlewares,
  validUser,
  createToken,
  validLogin,
  validJWT,
};
