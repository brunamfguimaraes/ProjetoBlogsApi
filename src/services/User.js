const { User } = require('../../models');
const utils = require('../utils');

const checkEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const err = new Error('User already registered');
    err.statusCode = 409;
    throw err;
  }
};

const checkEntries = (validUser) => {
  if (!validUser) {
    const err = new Error('Invalid fields');
    err.statusCode = 400;
    throw err;
  }
};

const create = async ({ displayName, email, password, image }) => {
  await checkEmailExists(email);
  await User.create({ displayName, email, password, image });
  const token = utils.createToken({ displayName, email });
  return token;
};

const login = async ({ email, password }) => {
  const validUser = await User.findOne({ where: { email, password } });
  checkEntries(validUser);
  const { _password, ...payload } = validUser;
  const token = utils.createToken(payload);
  return token;
};

module.exports = {
  create,
  login,
};

/**
 * displayName  >= 8 characters
 * email --> valid email // único
 * passsword === 6 characters long
 * 
 */