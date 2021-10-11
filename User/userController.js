const rescue = require('express-rescue');
const service = require('./userService');
const { User } = require('../models');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await service.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

const login = rescue(async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login({ email, password });
  res.status(200).json({ token });
});

const getAll = rescue(async (_req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

module.exports = {
  create,
  login,
  getAll,
};
