require('dotenv').config();
const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const options = {
  algorithm: 'HS256',
  expiresIn: '40m',
};

function createToken(payload) {
  const token = JWT.sign(payload, secret, options);
  return token;
}

function checkToken(token) {
  if (!token) {
    const error = new Error('Token not found');
    error.code = 401;
    throw error;
  }
}

function validateToken(token) {
  checkToken(token);
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    error.message = 'Expired or invalid token';
    error.code = 401;
    throw error;
  }
}

module.exports = {
  createToken,
  validateToken,
};
