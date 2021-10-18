const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ where: { email, password } });
    if (userExist) {
      const userToken = jwt.sign({ data: email }, secret, jwtConfig);
      return res.status(200).json({ userToken });
    }
    return res.status(400).json({ message: 'Invalid fields' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
