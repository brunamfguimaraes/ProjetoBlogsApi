const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (id, displayName, email) => {
  const payload = { id, displayName, email };
  return jwt.sign({ data: payload }, secret, jwtConfiguration);
};

module.exports = {
  generateToken,
};