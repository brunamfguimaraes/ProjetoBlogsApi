const express = require('express');

const createToken = require('../middleware/createToken');
const validateLogin = require('../middleware/loginValidate');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, createToken, async (req, res) => {
  try {
    const { token } = req;

    return res.status(200).json({ token });    
  } catch (error) {
    return res.status(500).json({ error });    
  }
});

module.exports = loginRouter;