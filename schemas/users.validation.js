const { User } = require('../models');

const verifyDisplayName = (displayName) => {
  if (displayName.length < 8) {
    const error = new Error(
      '"displayName" length must be at least 8 characters long',
    );
    error.code = 400;

    throw error;
  }
  return true;
};
const verifyEmail = (email) => {
  if (!email) {
    const error = new Error('"email" is required');
    error.code = 400;
    throw error;
  }
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!emailRegex.test(email)) {
    const error = new Error('"email" must be a valid email');
    error.code = 400;
    throw error;
  }
};

const verifyPassword = (password) => {
  if (!password) {
    const error = new Error('"password" is required');
    error.code = 400;
    throw error;
  }
  if (password.length !== 6) {
    const error = new Error('"password" length must be 6 characters long');
    error.code = 400;
    throw error;
  }
};

const userExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const error = new Error('User already registered');
    error.code = 409;
    throw error;
  }
};

module.exports = {
  userExists,
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
};
