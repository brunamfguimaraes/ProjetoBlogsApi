const { User } = require('../models');

const checkEmailUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { fieldError: true, message: 'User already registered' };

  return { isError: false };
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { fieldError: true, message: 'User does not exist' };
  }

  return user;
};

module.exports = {
  checkEmailUser,
  findById,
};