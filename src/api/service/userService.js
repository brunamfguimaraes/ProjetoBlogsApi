const { User } = require('../../models');

const createUserService = async (body) => {
  const user = await User.create(body);
  return user;
};

module.exports = {
  createUserService,
};
