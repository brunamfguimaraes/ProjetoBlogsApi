const { User } = require('../../models');
const validations = require('../validations/user');
const utils = require('../utils');

async function createUser(displayName, email, password, image) {
  validations.userValidation(displayName, email, password, image);
  await validations.emailValidation(email, User);
  await User.create({ displayName, email, password, image });
  const token = utils.createToken({ displayName, email });
  return token;
}

async function login(email, password) {
  validations.loginValidation(email, password);
  const user = await User.findOne({ where: { email, password } });
  validations.userCheck(user);
  const token = utils.createToken({ email, password, id: user.id });
  return token;
}

async function getUsers() {
  const result = await User.findAll({});
  return result;
}

async function getUserById(id) {
  const result = await User.findOne({ where: { id } });
  validations.userExists(result);
  return result;
}

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
};
