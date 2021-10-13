const jwt = require('jsonwebtoken');
require('dotenv').config();
const middlewares = require('../middlewares');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createUser = async (body) => {
  const { displayName, email, password, image } = body;
  
  const verifyEmail = await middlewares.verifyEmail(email);
  
  if (verifyEmail) return verifyEmail;

  const user = await User.create({ displayName, email, password, image });
  
  const payload = { ...user };
  const token = jwt.sign(payload, SECRET, jwtConfig);
  
  return token;
};

module.exports = {
  createUser,
};