const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const Token = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { data } = decoded;
    req.user = data;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = { Token };