const errorMiddlewares = require('./error');
const validateUser = require('./validUser');
const createToken = require('./createToken');

module.exports = {
  errorMiddlewares,
  validateUser,
  createToken,
};
