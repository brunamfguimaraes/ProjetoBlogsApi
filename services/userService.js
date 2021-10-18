const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email, password } });
  if (!findUser) {
    return { error: true, message: 'Invalid fields', status: 400 };
  }
  return findUser;
};

const getAllUsers = async () => {
  const getAll = await User.findAll({ attributes: { exclude: ['password'] } });
  return getAll;
};

module.exports = { 
  createUser,
  loginUser,
  getAllUsers,
};