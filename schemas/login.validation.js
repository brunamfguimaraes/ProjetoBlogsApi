const { User } = require('../models');

const verifyEmail = (email) => {
  if (!email && email !== '') {
    const error = new Error('"email" is required');
    error.code = 400;
    throw error;
  }
  if (email === '') {
    const error = new Error('"email" is not allowed to be empty');
    error.code = 400;
    throw error;
  }
};
const verifyPassword = (password) => {
  if (!password && password !== '') {
    const error = new Error('"password" is required');
    error.code = 400;
    throw error;
  }
  if (password === '') {
    const error = new Error('"password" is not allowed to be empty');
    error.code = 400;
    throw error;
  }
};

const userExists = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    const error = new Error('Invalid fields');
    error.code = 400;
    throw error;
  }
  return user;
};

module.exports = { verifyEmail, verifyPassword, userExists };
