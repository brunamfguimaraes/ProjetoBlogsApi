const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const { required, isEmpty } = require('../middlewares/loginMiddleware');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const router = express.Router();

router.post('/', required, isEmpty, async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ where: { email, password } });
    if (userExist) {
      const userToken = jwt.sign({ data: email, secret, jwtConfig });
      return res.status(200).json(userToken);
    }
    return res.status(400).json({ message: 'Invalid fields' });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
