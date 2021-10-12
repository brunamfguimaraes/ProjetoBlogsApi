// const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { createUser, getAll, serviceById } = require('../services/userService');

const post = async (req, res, _next) => {
  const { password, ...payload } = req.body;
  const user = await createUser(req.body);

  if (user.isError) {
    return res.status(user.code).json({ message: user.message });
  }

  const token = jtw.sign(payload, process.env.JWT_SECRET, { expiresIn: '45m' });

  return res.status(201).json({ token });
};

const get = async (_req, res) => {
  const users = await getAll();
  return res.status(200).json(users);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const users = await serviceById(id);
  if (users.isError) {
    return res.status(users.code).json({ message: users.message });
  }
  return res.status(200).json(users);
};

module.exports = {
  post,
  get,
  getById,
};
