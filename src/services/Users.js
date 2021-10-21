const { User } = require('../../models');

const createUser = async (user) => {
  const newUser = await User.create(user);

  return newUser;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const getUserById = async (id) => {
  const UserById = await User.findByPk(id);

  return UserById;
};

const updateUser = async (name, description, id) => {
  const updatedUser = await User.update({ name, description }, { where: { id } });

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
