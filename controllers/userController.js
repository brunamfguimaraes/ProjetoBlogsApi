const { User } = require('../models');
const { newToken } = require('../auth/createToken');

const createUser = async (req, res) => {
  const { body } = req;
  await User.create(body);
  const token = await newToken(body);
  res.status(201).json({ token });
};

module.exports = {
  createUser,
};