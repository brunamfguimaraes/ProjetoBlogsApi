const status = require('http-status');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const userService = require('../services/userService');
require('dotenv').config();

// JWT //
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
//    //

const secretKey = process.env.JWT_SECRET;

const validNameEmailPassword = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const isValidDisplayName = userService.isValidDisplayName(displayName);
  const isValidEmail = userService.isValidEmail(email);
  const isValidPassword = userService.isValidPassword(password);

  if (isValidDisplayName) {
    return res.status(status.BAD_REQUEST).json({ message: isValidDisplayName });
  }
    
  if (isValidEmail) {
    return res.status(status.BAD_REQUEST).json({ message: isValidEmail });
  }
    
  if (isValidPassword) {
    return res.status(status.BAD_REQUEST).json({ message: isValidPassword });
  }

  next();
};

const validUser = async (req, res, next) => {
  const { email } = req.body;

  const existUser = await userService.existUser(email);
  
  if (existUser) {
    return res.status(status.CONFLICT).json({ message: existUser });
  }

  next();
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userData = {
    email,
  };
  
  const token = jwt.sign({ data: userData }, secretKey, jwtConfig);
  
  await User.create({ displayName, email, password, image });
  return res.status(status.CREATED).json({ token });
};

module.exports = { validNameEmailPassword, validUser, createUser };