const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');
const {
  validateDisplayName,
  validateEmail,
  validatePassword } = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
const router = express.Router();

router.get('/', validateToken, async (_req, res) => {
  const users = await User.findAll();
  return res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
});

router.post('/', validateDisplayName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return res.status(201).json({ token });
});

module.exports = router;