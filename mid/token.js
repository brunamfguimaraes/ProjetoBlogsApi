const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const createToken = (data) => {
  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,
};