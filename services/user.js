const { User } = require('../models');
const { jwtSign } = require('../middlewares/jwt');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async ({ displayName, email, password, image }) => {
  const token = jwtSign({ email, password });
  await User.create({ displayName, email, password, image });
  return token;
};

module.exports = {
  getUserByEmail,
  createUser,
};