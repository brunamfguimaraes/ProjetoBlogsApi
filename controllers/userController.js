const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const { validName, validEmail, validPassword } = require('../middlewares/userMiddleware.js');
const { validToken } = require('../middlewares/tokenMiddleware.js');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const router = express.Router();

router.get('/', validToken, async (_req, res) => {
  const allUsers = await User.findAll();
  return res.status(200).json(allUsers);
});

router.get('/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const userId = await User.findOne({ where: { id } });
  if (!userId) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(userId);
});

router.post('/', validName, validEmail, validPassword, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(409).json({ message: 'User already registered' });
    await User.create({ displayName, email, password, image });
    const userToken = jwt.sign({ data: email }, secret, jwtConfig);
    res.status(201).json(userToken);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;