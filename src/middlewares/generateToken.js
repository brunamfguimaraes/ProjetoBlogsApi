const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env || 'minhaSenhaBlog';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (email) => {
  const token = jwt.sign({ data: email }, JWT_SECRET, jwtConfig);
  return { token };
};

module.exports = generateToken;
