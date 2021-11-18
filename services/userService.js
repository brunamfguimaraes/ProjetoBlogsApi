const httpStatus = require('http-status');

const { User } = require('../models');
const generateToken = require('../utils/token');
const validateUser = require('../utils/validation');

const createUser = async (user) => {
  await validateUser.createUser(user);
  await User.create(user);
  const token = generateToken(user);
  return ({ status: httpStatus.CREATED, token });
};

module.exports = {
  createUser,
};
