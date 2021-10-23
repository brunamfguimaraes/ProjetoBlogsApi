const express = require('express');

const router = express.Router();
const newLogin = require('../services/loginService');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await newLogin.login(email, password);

    if (typeof login.message === 'string') return res.status(400).json(login);

    return res.status(200).json(login);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;