const error = require('./error');
const { validationUser, verifyEmail, verifyUserById } = require('./validateUser');
const { validationLogin, existsUser } = require('./validateLogin');
const validateJWT = require('./validateJWT');

module.exports = {
  error,
  validationUser,
  verifyEmail,
  validationLogin,
  existsUser,
  validateJWT,
  verifyUserById,
};