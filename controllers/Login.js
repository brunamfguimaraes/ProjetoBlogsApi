const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const Login = require('../services/Login');
const { loginValidate } = require('../middlewares');
require('dotenv/config');

const login = express.Router();

login.post(
  '/',
  loginValidate,
  rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const loginCheck = await Login.verify(email, password);
    if (loginCheck.isError) return next(loginCheck);
    const payload = { email, id: loginCheck.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  }),
);

module.exports = login;
