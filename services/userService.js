const { User } = require('../models');

const isEmptyEmail = (email) => {
  if (email === undefined) {
    return '"email" is required';
  }

  if (email.length === 0) {
    return '"email" is not allowed to be empty';
  }

  return false;
};

const isValidEmail = (email) => {
  if (isEmptyEmail(email)) {
    return isEmptyEmail(email);
  }

  const div = email.split('@');
  if (!email.includes('@') || !div[0] || !div[1]) {
    return '"email" must be a valid email';
  }

  return false;
};

const isValidPassword = (password) => {
  if (password === undefined) {
    return '"password" is required';
  }

  if (password.length === 0) {
    return '"password" is not allowed to be empty';
  }

  if (password.length === 5) {
    return '"password" length must be 6 characters long';
  }

  return false;
};

const isValidDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return '"displayName" length must be at least 8 characters long';
  }

  return false;
};

const existUser = async (dado) => {
  let user;

  if (dado.length > 1) {
    user = await User.findOne({ where: { email: dado } });
  } else {
    user = await User.findOne({ where: { id: dado } });
  }
  
  if (user) {
    return 'User already registered';
  }

  return false;
};

module.exports = { 
  isValidEmail,  
  isEmptyEmail, 
  isValidPassword, 
  isValidDisplayName, 
  existUser };