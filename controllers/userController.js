const { User } = require('../models');
const { newToken } = require('../auth/createToken');

const createUser = async (req, res) => {
  const { body } = req;
  const { id } = await User.create(body);
  const token = await newToken({ ...body, id });
  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(allUsers);
};

module.exports = {
  createUser,
  getAllUsers,
};