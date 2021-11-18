const httpStatus = require('http-status');

const { User } = require('../models');
const validateUser = require('../utils/validation');

const create = async (user) => {
  await validateUser(user);
  const data = await User.create(user);
  return ({ status: httpStatus.CREATED, data });
};

module.exports = {
  create,
};
