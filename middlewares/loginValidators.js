const { User } = require('../models');
const isError = require('../utils/isError');
const { BAD_REQUEST } = require('../utils/statusCode');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email && email !== '') {
    return isError(res, BAD_REQUEST, '"email" is required');
  }

  if (email === '') {
    return isError(res, BAD_REQUEST, '"email" is not allowed to be empty');
  }

  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password && password !== '') {
    return isError(res, BAD_REQUEST, '"password" is required');
  }

  if (password === '') {
    return isError(res, BAD_REQUEST, '"password" is not allowed to be empty');
  }

  next();
};

const validateUserExists = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return isError(res, BAD_REQUEST, 'Invalid fields');
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUserExists,
};