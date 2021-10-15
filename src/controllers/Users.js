const { CREATED } = require('http-status');
const { User } = require('../models');

const createUser = async (req, res) => {
  const userData = await User.create(req.body);
  res.status(CREATED).json(userData);
};

module.exports = { createUser };