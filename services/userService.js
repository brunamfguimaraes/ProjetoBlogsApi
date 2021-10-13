const { User } = require('../models');

const checkEmailUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { fieldError: true, message: 'User already registered' };

  return { isError: false };
};

module.exports = {
  checkEmailUser,
};