const jwt = require('jsonwebtoken');

const { User } = require('../models');

const privateKey = process.env.JWT_SECRET;

const INVALID_DISPLAY_NAME = {
  status: 400,
  error: {
    message: '"displayName" length must be at least 8 characters long',
  },
};

const EMAIL_NOT_EXISTS = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const INVALID_EMAIL = {
  status: 400,
  error: {
    message: '"email" must be a valid email',
  },
};

const PASSWORD_NOT_EXISTS = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const INVALID_PASSWORD = {
  status: 400,
  error: {
    message: '"password" length must be 6 characters long',
  },
};

const USER_ALREADY_EXISTS = {
  status: 409,
  error: {
    message: 'User already registered',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'Expired or invalid token',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'Token not found',
  },
};

const USER_NOT_EXISTS = {
  status: 404,
  error: {
    message: 'User does not exist',
  },
};

const validDisplayName = (displayName) => {
  if (displayName.length < 8) {
    throw INVALID_DISPLAY_NAME;
 }
};

const validEmail = (email) => {
  if (!email) {
    throw EMAIL_NOT_EXISTS;
  }
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) {
    throw INVALID_EMAIL;
  }
};

const validPassword = (password) => {
  if (!password) {
    throw PASSWORD_NOT_EXISTS;
  }
  if (password.length < 6) {
    throw INVALID_PASSWORD;
  }
};

const validEmailExists = async (email) => {
  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) {
    throw USER_ALREADY_EXISTS;
  }
};

const validToken = (token) => {
  if (!token) {
    throw MISSING_AUTH;
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (error) {
    throw INVALID_TOKEN;
  }
};

const validUser = (user) => {
  if (!user) {
    throw USER_NOT_EXISTS;
  }
};

module.exports = {
  validDisplayName,
  validEmail,
  validPassword,
  validEmailExists,
  validToken,
  validUser,
};