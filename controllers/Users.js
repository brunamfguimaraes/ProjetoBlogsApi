const { User } = require('../models');

const createUser = async (req, _res) => {
  const { body } = req;
  const a = await User.create(body);
  return console.log(a);
};

module.exports = { createUser };