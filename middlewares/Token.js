const JWT = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => JWT.sign(payload, process.env.JWT_SECRET);

const authenticateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) return next({ message: 'Token not found' });
  try {
    JWT.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    next({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};