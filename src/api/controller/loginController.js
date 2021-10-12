const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validationLogin = require('../middleware/validations/validationLogin');
const login = require('../service/loginService');

const routeLogin = express.Router();

routeLogin.post('/', validationLogin, async (req, res, next) => {
  const { email } = req.body;
  const result = await login(req.body);
  console.log(result);
  if (result.isError) {
    console.log('result :', result);
    return next(result);
  }
  const tempo = {
    expiresIn: '1d',
  };
  const token = jwt.sign({ email }, secret, tempo);
  return res.status(200).json({ token });
});

module.exports = routeLogin;
