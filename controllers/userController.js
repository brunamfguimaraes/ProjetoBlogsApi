const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('../models');
const { userNameValidation,
  emailValidation,
  passwordValidation,
  } = require('../services/userValidation');

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
  emailValidation,
  passwordValidation, async (req, res) => {
  try {
    const { dataValues } = await User.create(req.body);
    delete dataValues.password;
    const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
    return res.status(CREATED).json({ token });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
});

module.exports = Router;
