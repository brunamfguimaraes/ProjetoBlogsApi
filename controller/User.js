const { User } = require('../models');
const { generateToken } = require('../Token/creatToke');

const createUser = async (req, res) => {
 const { body } = req;
 const { id } = await User.create(body);
 const token = await generateToken({ ...body, id });
 res.status(201).json({ token });
};

const getUser = async (req, res) => {
 const getAll = await User.findAll({ attributes: { exclude: ['password'] } });
 console.log(getAll);
 res.status(200).json(getAll);
};

module.exports = {
  createUser,
  getUser,
};