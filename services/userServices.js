const { User } = require('../models');

const addUser = async (user) => {
  const userExists = await User.findOne({ where: { email: user.email } });
  if (!userExists) {
    // validateUser(user);
  }
  return { message: 'User already registered' };
};

module.exports = {
  addUser,
};
