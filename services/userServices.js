const { User } = require('../models');

const checkDisplayName = (displayName) => {
  if (displayName.length < 8) return false;
  return true;
};

const checkEmail = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  return emailRegex.test(email);
};

const checkUser = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (result) return true;
  return false;
};

const addUser = async (user) => {
  console.log(`aqui: ${user}`);
  await User.create(user);
  return User;
};

const getAllUsers = async () => {
  const result = await User.findAll();
  return result;
};

const getUserById = async (id) => {
  const result = await User.findOne({ where: { id } });
  return result;
};

module.exports = {
  checkDisplayName,
  checkEmail,
  checkUser,
  addUser,
  getAllUsers,
  getUserById,
};