const express = require('express');
const CODE = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = 'seusecretdetoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const login = await User.findOne({ where: { email, password } });
    console.log(login);
    if (!login) return res.status(CODE.BAD_REQUEST).json({ message: 'Invalid fields' });
     
    const token = jwt.sign({ data: login }, secret, jwtConfig);

    return res.status(CODE.OK).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(CODE.NOT_FOUND).json({ message: 'ERROR' });
  }
});

module.exports = router;