const { User } = require('../models');
const { bodyValidator, userExistsValidator } = require('./userValidator');

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

module.exports = {
  createUser,
  getUser,
};