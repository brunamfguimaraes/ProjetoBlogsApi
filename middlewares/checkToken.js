const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status');
const ERROR_MESSAGE = require('../services/error');

require('dotenv').config();

const secret = process.env.JWT_SECRET;
const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: ERROR_MESSAGE.noToken });
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload.data;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: ERROR_MESSAGE.invalidToken });
  }
};

module.exports = checkToken; 