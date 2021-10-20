const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_SECRET;

const MISSING_NAME = {
  status: 400,
  error: {
    message: '"name" is required',
  },
};

const INVALID_TOKEN = {
  status: 401,
  error: {
    message: 'Expired or invalid token',
  },
};

const MISSING_AUTH = {
  status: 401,
  error: {
    message: 'Token not found',
  },
};

const validName = (name) => {
  if (!name) {
    throw MISSING_NAME;
  }
};

const validToken = (token) => {
  if (!token) {
    throw MISSING_AUTH;
  }
  try {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  } catch (error) {
    throw INVALID_TOKEN;
  }
};

module.exports = {
  validName,
  validToken,
};