const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const creatToken = (displayName, email) => {
  const token = jwt.sign({ displayName, email }, secret, jwtConfig);
  return token;
};

const validateJwt = (token) => {
  if (!token) return { status: true, message: { message: 'Token not found' } };

  try {
    jwt.verify(token, secret);
    return { status: false };
  } catch (error) {
    return { status: true, message: { message: 'Expired or invalid token' } };
  }
};

module.exports = {
  validateJwt,
  creatToken,
};
