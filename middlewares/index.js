const error = require('./error');
const { validationUser, verifyEmail } = require('./validateUser');
const { validationLogin, existsUser } = require('./validateLogin');
// const validateRecipe = require('./validationRecipe');
// const validateJWT = require('./validateJWT');

module.exports = {
  error,
  validationUser,
  verifyEmail,
  validationLogin,
  existsUser,
  // validateJWT,
};