const { createToken } = require('../auth/createToken');
const { User } = require('../models');
const { userDataEntries } = require('../validations/Users');

const createUser = async (userData) => {
  const invalidEntries = userDataEntries(userData);

  if (invalidEntries.message) return invalidEntries;
  
  const emailAlreadyInUse = await User.findOne({ where: { email: userData.email } });

  if (emailAlreadyInUse) return { message: 'User already registered', conflict: true };

  const { id: userId, displayName, email } = await User.create(userData);

  const token = createToken({ userId, displayName, email });

  return { token };
};

const getAllUsers = async () => User.findAll({ exclude: ['password'] });

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { message: 'User does not exist' };

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
