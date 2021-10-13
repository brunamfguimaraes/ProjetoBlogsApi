const { User } = require('../models');

const create = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
};
