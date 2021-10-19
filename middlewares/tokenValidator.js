require('dotenv/config');
const JWT = require('jsonwebtoken');

const isError = require('../utils/isError');
const { UNAUTHORIZED } = require('../utils/statusCode');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return isError(res, UNAUTHORIZED, 'Token not found');
  }

  try {
    JWT.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return isError(res, UNAUTHORIZED, 'Expired or invalid token');
  }

  const payload = JWT.verify(token, process.env.JWT_SECRET);
  req.user = payload;

  next();
};

module.exports = { validateToken };