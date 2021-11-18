const { User } = require('../../models');
const { ApiError } = require('../utils/ApiError');
const { userExists, validateUserData } = require('../schemas/validateUser');

const createUserService = async (body) => {
  await validateUserData(body);

  const userInDb = await userExists(body.email);

  if (userInDb) {
    throw new ApiError('User already registered', 409);
  }

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

const deleteUserService = async (user) =>
  User.destroy({
    where: { id: user.id },
  });

module.exports = {
  createUserService,
  getUsers,
  getUserById,
  deleteUserService,
};
