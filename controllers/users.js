const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};
const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const exists = await User.findOne({ where: { email } });
  console.log(exists);
  if (exists) return res.status(409).json({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return res.status(201).json({ token });
});

module.exports = router;