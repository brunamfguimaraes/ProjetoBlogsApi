const { User } = require('../models');

const isValidEmail = (email) => {
  if (!email) {
    return '"email" is required';
  } 
  
  if (!email.includes('@')) {
    return '"email" must be a valid email';
  }

  const div = email.split('@');
 
  if (!div[0] || !div[1]) {
    return '"email" must be a valid email';
  }

  return false;
};

const isValidPassword = (password) => {
  if (password.length === 5) {
    return '"password" length must be 6 characters long';
  }

  return false;
};

const isValidDisplayName = (displayName) => {
  if (displayName.length < 8) {
    return '"displayName" length must be at least 8 characters long"';
  }

  return false;
};

const existUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (user) {
    return 'User already registered';
  }

  return false;
};

module.exports = { isValidEmail, isValidPassword, isValidDisplayName, existUser };