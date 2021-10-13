const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = process.env.JWT_SECRET;

const creatToken = (userId, displayName, email) => {
  const token = jwt.sign({ userId, displayName, email }, secret, jwtConfig);
  return token;
};

const validateJwt = (token) => {
  if (!token) return { validToken: true, message: { message: 'Token not found' } };

  try {
    const result = jwt.verify(token, secret);
    return { validToken: false, result };
  } catch (error) {
    return { validToken: true, message: { message: 'Expired or invalid token' } };
  }
};

module.exports = {
  validateJwt,
  creatToken,
};
