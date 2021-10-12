const { User } = require('../models');

const verifyEmail = ({ email }) => {
  try {
    if (!email) {
      return { message: '"email" is required' };
    }
    if (!email.includes('@') || !email.includes('.com')) {
      return { message: '"email" must be a valid email' };
    }
    return { message: 'ok' };
  } catch (error) {
    return { message: '"email" is required' };
  }
};

const verifyName = ({ displayName }) => {
  try {
    if (!displayName) {
      return { message: '"DisplayName" is required' };
    }
    if (displayName.length < 8) {
      return { message: '"displayName" length must be at least 8 characters long' };
    }
    return { message: 'ok' };
  } catch (error) {
    return { message: '"DisplayName" is required' };
  }
};

const verifyPassword = ({ password }) => {
  try {
    if (!password) {
      return { message: '"password" is required' };
    }
    if (password.length < 6) {
      return { message: '"password" length must be 6 characters long' };
    }
    return { message: 'ok' };
  } catch (error) {
    return { message: '"password" is required' };
  }
};

const userExists = async (user) => {
  const { email } = user;
  const result = await User.findOne({ where: { email } });
  if (result) return { message: 'User already registered' };
  return { message: 'ok' };
};

module.exports = {
  verifyEmail, 
  verifyName, 
  verifyPassword, 
  userExists,
};