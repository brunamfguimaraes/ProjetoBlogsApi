require('dotenv').config();
const Jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const JwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30m',
};

const createToken = (payload) => Jwt.sign(payload, JWT_SECRET, JwtConfig);

module.exports = {
  createToken,
};
