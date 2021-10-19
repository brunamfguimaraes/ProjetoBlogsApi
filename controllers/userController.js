const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models');
const { userNameValidation,
  emailRequireValidation,
  emailFormatValidation,
  existEmailValidation,
  passwordLengthValidation,
  passwordRequireValidation } = require('../services/userValidation');

const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'mySuperPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const Router = express.Router();

Router.post('/',
  userNameValidation,
  emailRequireValidation,
  emailFormatValidation,
  existEmailValidation, passwordLengthValidation, passwordRequireValidation, async (req, res) => {
  try {
    const { userInfo } = await User.create(req.body);
    delete userInfo.password;
    const token = jwt.sign({ data: userInfo }, secret, jwtConfig);
    return res.status(CREATED).json({ token });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
});

module.exports = Router;
