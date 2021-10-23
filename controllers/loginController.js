const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const newLogin = require('../services/loginService');

const secret = 'tokensecreto';

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await newLogin.login(email, password);

    if (typeof user.message === 'string') return res.status(400).json(user);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;