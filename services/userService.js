const httpStatus = require('http-status');

const { User } = require('../models');
const generateToken = require('../utils/token');
const validate = require('../utils/validation');

const createUser = async ({ displayName, email, password, image }) => {
  await validate.createUser(displayName, email, password);
  await User.create({ displayName, email, password, image });
  const token = generateToken(email);
  return ({ status: httpStatus.CREATED, token });
};

const getAll = async () => {
  const data = await User.findAll();
  return ({ status: httpStatus.OK, data });
};

module.exports = {
  createUser,
  getAll,
};
