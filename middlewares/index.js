const errorMiddlewares = require('./error');
const validUser = require('./validUser');
const createToken = require('./createToken');

module.exports = {
  errorMiddlewares,
  validUser,
  createToken,
};
