const error = require('./error');
const { validationUser, verifyEmail } = require('./validateUser');
const { validationLogin, existsUser } = require('./validateLogin');
const validateJWT = require('./validateJWT');
// const validateRecipe = require('./validationRecipe');

module.exports = {
  error,
  validationUser,
  verifyEmail,
  validationLogin,
  existsUser,
  validateJWT,
};