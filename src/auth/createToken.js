require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'semsenhabjs';
const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

module.exports = {
  createToken,
};
