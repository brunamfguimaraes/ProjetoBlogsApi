const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

const HTTP = {
  Ok: 200,
  BadRequest: 400,
};

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ where: { email, password } });
    if (exists) {
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      return res.status(HTTP.Ok).json({ token });
    }

    if (!exists) return res.status(HTTP.BadRequest).json({ message: 'Invalid fields' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router; 