const error = require('./error');
const { validationUser, verifyEmail, verifyUserById } = require('./validateUser');
const { validationLogin, existsUser } = require('./validateLogin');
const validateJWT = require('./validateJWT');
const { validationCategory, existsCategory } = require('./validateCategory');
const { 
  validationPost, 
  decodeToken, 
  verifyPostById, 
  validationUpdatePost,
  validateUser,
  verifyCategory,
} = require('./validatePost');

module.exports = {
  error,
  validationUser,
  verifyEmail,
  validationLogin,
  existsUser,
  validateJWT,
  verifyUserById,
  validationCategory,
  validationPost,
  existsCategory,
  decodeToken,
  verifyPostById,
  validationUpdatePost,
  validateUser,
  verifyCategory,
};