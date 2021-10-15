const { User } = require('../models');
const Error = require('../helpers/errors');

const createUser = async (userCreate) => {
  const { email } = userCreate;
  const checkEmail = await User.findOne({ where: { email } });
  if (checkEmail) {
    return Error.conflict('User already registered');
  }
  return User.create(userCreate);
};

const allUser = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  createUser,
  allUser,
};