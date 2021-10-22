require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = jwt.sign(data, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,
};
