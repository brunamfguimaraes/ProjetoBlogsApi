const { User } = require('../models');

const EMAIL_NOT_EXIST = {
  status: 400,
  error: {
    message: '"email" is required',
  },
};

const EMPTY_EMAIL = {
  status: 400,
  error: {
    message: '"email" is not allowed to be empty',
  },
};

const INVALID_EMAIL = {
  status: 400,
  error: {
    message: '"email" must be a valid email',
  },
};

const PASSWORD_NOT_EXIST = {
  status: 400,
  error: {
    message: '"password" is required',
  },
};

const EMPTY_PASSWORD = {
  status: 400,
  error: {
    message: '"password" is not allowed to be empty',
  },
};

const INVALID_LOGIN = {
  status: 400,
  error: {
    message: 'Invalid fields',
  },
};

const validEmail = (email) => {
  if (email === '') {
    throw EMPTY_EMAIL;
  }
  if (!email) {
    throw EMAIL_NOT_EXIST;
  }
  const isEmailValid = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}/).test(email);
  if (!isEmailValid) {
    throw INVALID_EMAIL;
  }
};

const validPassword = (password) => {
  if (password === '') {
    throw EMPTY_PASSWORD;
  }
  if (!password) {
    throw PASSWORD_NOT_EXIST;
  }
};

const validLogin = async (email, password) => {
  const userLogin = await User.findOne({ where: { email, password } });
  if (!userLogin) {
    throw INVALID_LOGIN;
  }
  delete userLogin.dataValues.password;
  return userLogin.dataValues;
};

module.exports = {
  validEmail,
  validPassword,
  validLogin,
};
