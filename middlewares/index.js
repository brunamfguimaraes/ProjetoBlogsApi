const error = require('./error');
const { validationUser, verifyEmail, verifyUserById } = require('./validateUser');
const { validationLogin, existsUser } = require('./validateLogin');
const validateJWT = require('./validateJWT');
const validationCategory = require('./validateCategory');

module.exports = {
  error,
  validationUser,
  verifyEmail,
  validationLogin,
  existsUser,
  validateJWT,
  verifyUserById,
  validationCategory,
};