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
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ where: { email, password } });
    if (exists) {
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: 'Invalid fields' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;