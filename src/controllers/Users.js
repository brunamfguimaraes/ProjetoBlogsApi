const { User } = require('../models');

const createUser = async (req, _res) => {
  const { body } = req;
  return User.create(body);
};

module.exports = { createUser };