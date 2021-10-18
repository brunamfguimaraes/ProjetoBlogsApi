require('dotenv').config();
const jwt = require('jsonwebtoken');
const { user } = require('../models');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;
const jwfConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const valid = await userService.createUser(displayName, email, password, image);
  if (valid.message) {
    return next(valid);
  }
  try {
    await user.createUser({ displayName, email, password });
    const token = await jwt.sign(
      { data: { displayName, email } }, JWT_SECRET, jwfConfig,
);
    
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
};