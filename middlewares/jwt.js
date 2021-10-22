require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const jwtSign = ({ email, password }) => {
  const token = jwt.sign({ email, password }, JWT_SECRET, jwtConfig);
  return token;
};

const jwtVerify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return { message: 'Token not found' };
  }
};

module.exports = {
  jwtSign,
  jwtVerify,
};