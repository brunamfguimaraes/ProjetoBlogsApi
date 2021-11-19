const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

const {
  validateDisplayName,
  validateEmail,
  validatePassword, 
} = require('../middlewares/validateNewUser');

const validateToken = require('../middlewares/validateToken');

const HTTP = {
  Ok: 200,
  Created: 201,
  NotFound: 404,
  Conflict: 409,
};

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const router = express.Router();

router.get('/', validateToken, async (_req, res) => {
  const users = await User.findAll();
  
  return res.status(200).json(users);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(HTTP.NotFound).json({ message: 'User does not exist' });

  return res.status(HTTP.Ok).json(user);
});

router.post('/', validateDisplayName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const exists = await User.findOne({ where: { email } });

  if (exists) return res.status(HTTP.Conflict).json({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(HTTP.Created).json({ token });
});

module.exports = router; 
