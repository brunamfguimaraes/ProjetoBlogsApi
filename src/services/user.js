const { User } = require('../../models');
const validations = require('../validations/user');
const utils = require('../utils');

async function newUser(displayName, email, password, image) {
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
  const token = utils.createToken({ email, password });
  return token;
}

async function getUsers(authorization) {
  utils.validateToken(authorization);
  const result = await User.findAll({});
  return result;
}

module.exports = {
  newUser,
  login,
  getUsers,
};
