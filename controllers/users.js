const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');
const {
  validateDisplayName,
  validateEmail,
  validatePassword } = require('../middlewares/validateNewUser');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
const router = express.Router();

router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  let user;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(authorization, secret);
    if (decoded.data) {
      user = await User.findOne({ where: { email: decoded.data } });
    }
    if (user) {
      const users = await User.findAll();
      return res.status(200).json(users);
    }
  } catch (_e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
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