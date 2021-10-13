const generateToken = require('../middlewares/generateToken');
const { User } = require('../models');
require('dotenv').config();

const { ERROR_INVALID_FIELDS, ERROR_USER_EXISTS } = require('./msgErrors');

const checkEmailExists = async (email) => {
  const emailExists = await User.findOne({ where: { email } });
  return emailExists;
};

const createUser = async (newUser) => {
  const emailExists = await checkEmailExists(newUser.email);
  if (emailExists) { throw ERROR_USER_EXISTS; }
  await User.create(newUser);
  return generateToken(newUser.email);
};

const login = async ({ email }) => {
  const userRegistered = await checkEmailExists(email);
  if (!userRegistered) { throw ERROR_INVALID_FIELDS; }
  return generateToken(email);
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  createUser,
  login,
  getUsers,
};
