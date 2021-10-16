const User = require('../models/user');

const isValidEmail = (email) => {
  if (!email) {
    return '"email" is required';
  } 
  
  if (!email.includes('email.com') && !email.includes('gmail.com')) {
    return '"email" must be a valid email';
  }

  if (!email.includes('@')) {
    return '"email" must be a valid email';
  }

  return false;
};

const isValidPassword = (password) => {
  if (password.length < 6) {
    return '"password" length must be 6 characters long';
  }
  return false;
};

const isValidDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return '"displayName length must br at least 8 characters long"';
  }
  return false;
};

const existUser = async (displayName) => {
  const user = await User.findOne({ where: { displayName } });
  
  if (user === null) {
    return 'User already registered';
  }

  return false;
};

module.exports = { isValidEmail, isValidPassword, isValidDisplayName, existUser };