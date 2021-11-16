const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

const HTTP = {
  Created: 201,
  Conflict: 409,
};

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '2h', algorithm: 'HS256' };

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const exists = await User.findOne({ where: { email } });

  if (exists) return res.status(HTTP.Conflict).json({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(HTTP.Created).json({ token });
});

module.exports = router; 
