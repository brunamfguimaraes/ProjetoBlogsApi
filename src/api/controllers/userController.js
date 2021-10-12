const rescue = require('express-rescue');
require('dotenv').config();
const jtw = require('jsonwebtoken');
const { createUser, getAll, serviceById } = require('../services/userService');

const post = rescue(async (req, res, next) => {
  const { password, ...payload } = req.body;
  const user = await createUser(req.body);

  if (user.isError) {
    return next(user);
  }

  const token = jtw.sign(payload, process.env.SECRET, { expiresIn: '45m' });

  return res.status(201).json({ token });
});

const get = async (_req, res) => {
  const users = await getAll();
  return res.status(200).json(users);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const users = await serviceById(id);
  if (users.isError) {
    return next(users);
  }
  return res.status(200).json(users);
};

module.exports = {
  post,
  get,
  getById,
};
