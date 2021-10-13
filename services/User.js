const { User } = require('../models');

const create = async (user) => {
  try {
    return await User.create(user);
  } catch (error) {
    return error;
  }
};

const findAll = async () => {
  try {
    return await User.findAll({});
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
  findAll,
};
