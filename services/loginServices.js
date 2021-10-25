const { User } = require('../models');

const createLogin = async ({ email }) => {
  const userLogin = await User.findOne({ where: { email } });
  return userLogin;
};

module.exports = { createLogin };