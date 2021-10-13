const auth = require('../auth');
const { Users } = require('../models');

const userDoesNotExist = async (email, password) => {
  const findUser = await Users.findOne({ where: { email, password } });
  return findUser;
};

const checkUserExistence = async (email) => {
  const existenceOfUser = await Users.findOne({ where: { email } });
  return existenceOfUser;
};

const createUser = async (displayName, email, password, image) => {
  const token = await auth.createToken({ displayName, email, password, image });
  await Users.create({ displayName, email, password, image });
  return token;
};

module.exports = {
  checkUserExistence,
  createUser,
  userDoesNotExist,
};
