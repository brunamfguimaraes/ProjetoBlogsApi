const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validationLogin = require('../middleware/validations/validationLogin');
const login = require('../service/loginService');

const routeLogin = express.Router();

routeLogin.post('/', validationLogin, async (req, res, next) => {
  const result = await login(req.body);
  const { id, displayName } = result;
  const payload = { id, displayName };
  if (result.isError) {
    return next(result);
  }
  const tempo = {
    expiresIn: '10d',
  };
  const token = jwt.sign({ payload }, secret, tempo);
  return res.status(200).json({ token });
});

module.exports = routeLogin;
