const { User } = require('../../models');

const createUserService = async (body) => {
  const user = await User.create(body);
  return user;
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  createUserService,
  getUsers,
};
