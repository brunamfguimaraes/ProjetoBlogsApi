const jwt = require('jsonwebtoken');
require('dotenv/config');

const { JWT_SECRET } = process.env;

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error('Token not found');
    error.code = 401;
    throw error;
  }
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    error.message = 'Expired or invalid token';
    error.code = 401;
    throw error;
  }
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  next();
};

module.exports = { validateToken };
