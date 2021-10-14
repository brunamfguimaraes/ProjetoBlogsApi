const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv');

const verifyDisplayName = (displayName) => {
  if (displayName.length < 8) return false;
  return true;
};

const verifyEmail = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  return emailRegex.test(email);
  // if (!emailRegex.test(email)) return false;
};

const verifyUser = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (result) return true;
  return false;
};

const addUser = async (user) => {
  await User.create(user);
  return User;
};

const getAllUsers = async () => {
  const result = await User.findAll();
  return result;
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyUser,
  addUser,
  getAllUsers,
};
