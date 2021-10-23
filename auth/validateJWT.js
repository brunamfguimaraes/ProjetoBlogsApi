const { StatusCodes: {
  UNAUTHORIZED } } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  try {
    const { email } = jwt.verify(token, secret);
    req.user = email;
    return next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
module.exports = validateJWT;
