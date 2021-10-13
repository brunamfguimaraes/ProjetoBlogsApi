const { User } = require('../models');
const isError = require('../utils/isError');
const { BAD_REQUEST, CONFLICT } = require('../utils/statusCode');

const validateDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    isError(res, BAD_REQUEST, '"displayName" length must be at least 8 characters long');
  }

  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  if (!email) {
    isError(res, BAD_REQUEST, '"email" is required');
  }

  if (!emailRegex.test(email)) {
    isError(res, BAD_REQUEST, '"email" must be a valid email');
  }

  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    isError(res, BAD_REQUEST, '"password" is required');
  }

  if (password.length !== 6) {
    return isError(res, BAD_REQUEST, '"password" length must be 6 characters long');
  }

  next();
};

const validateUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (user) {
    return isError(res, CONFLICT, 'User already registered');
  }

  next();
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUserExists,
};