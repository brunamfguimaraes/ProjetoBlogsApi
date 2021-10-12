const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const RequestError = require('../helper/customErrors');

require('dotenv').config();

module.exports = rescue(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new RequestError('unauthorized', 'Token not found');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      const { id } = decoded;
      req.userId = id;
    }

    if (err) throw new RequestError('unauthorized', 'Expired or invalid token');
  });
  next();
});
