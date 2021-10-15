const { User } = require('../models');
const { generateToken } = require('../Token/creatToke');

const createUser = async (req, res) => {
 const { body } = req;
 const { id } = await User.create(body);
 const token = await generateToken({ ...body, id });
 res.status(201).json({ token });
};

const getAllUser = async (_req, res) => {
 const getAll = await User.findAll({ attributes: { exclude: ['password'] } });
 res.status(200).json(getAll);
};

const getUserById = async (req, res) => {
const { id } = req.params;
const getUser = await User.findOne({ where: { id } });
res.status(200).json(getUser);
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
};