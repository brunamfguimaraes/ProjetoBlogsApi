const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const tokenGenerate = (user) => {
  const payload = { ...user };
  return jwt.sign(payload, SECRET, jwtConfig);
};

module.exports = tokenGenerate;
