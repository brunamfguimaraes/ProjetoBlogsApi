const { User } = require('../models');
const { bodyValidator, userExistsValidator } = require('./userValidator');
const MyError = require('./errorClass');

async function createUser(user) {
  await bodyValidator(user);
  await userExistsValidator(user);
  const newUser = await User.create(user);
  return newUser;
}

async function getUser() {
  const user = await User.findAll();
  return user;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) throw new MyError('User does not exist', 404);
  return user;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
};