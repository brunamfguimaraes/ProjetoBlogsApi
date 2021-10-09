const { User } = require('../../models');
const { ApiError } = require('../utils/ApiError');

const createUserService = async (body) => {
  const user = await User.create(body);
  return user;
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new ApiError('User does not exist', 404);
  }

  return user;
};

module.exports = {
  createUserService,
  getUsers,
  getUserById,
};
