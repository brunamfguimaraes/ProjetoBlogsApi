require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '12h',
};

const isTokenValid = (authToken) => {
  try {
    jwt.verify(authToken, SECRET);
  } catch (err) {
    err.message = 'Expired or invalid token';
    err.statusCode = 401;
    throw err;
  }
};

const validateIfTokenExists = (token) => {
  if (!token) {
    const error = new Error('Token not found');
    error.statusCode = 401;
    throw error;
  }
};

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const authToken = jwt.sign(payload, SECRET, jwtConfig);
  return authToken;
};

const validateToken = (authToken) => {
  validateIfTokenExists(authToken);
  isTokenValid(authToken);
  const payload = jwt.verify(authToken, SECRET);
  return payload;
};

module.exports = {
  createToken,
  validateToken,
};
