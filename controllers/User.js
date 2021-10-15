const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Users = require('../services/User');
const { userValidate, auth } = require('../middlewares');
require('dotenv/config');

const users = express.Router();
const secret = process.env.JWT_SECRET;

users.post(
  '/',
  userValidate,
  rescue(async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await Users.create(displayName, email, password, image);
    if (newUser.isError) return next(newUser);
    const payload = { id: newUser.id, email };
    const token = jwt.sign(payload, secret);
    return res.status(201).json({ token });
  }),
);

users.use(auth);

users.get(
  '/',
  rescue(async (_req, res) => {
    const allUsers = await Users.findAll();
    return res.status(200).json(allUsers);
  }),
);

users.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.getUser(id);
    if (user.isError) return next(user);
    return res.status(200).json(user);
  }),
);

users.delete(
  '/me',
  rescue(async (req, res) => {
    await Users.destroy(req.user);
    res.status(204).json();
  }),
);

module.exports = users;
