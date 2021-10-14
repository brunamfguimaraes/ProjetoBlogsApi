const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, JWT_SECRET, jwtConfig);

module.exports = createToken;