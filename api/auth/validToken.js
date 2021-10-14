require('dotenv').config();
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.JWT_SECRET;

const validToken = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ status: 401, message: 'Token not found' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) next({ status: 401, message: 'Expired or invalid token' });
    req.payload = decoded;
  });

  const { payload } = req;

  const findEmail = await User.findOne({ where: { email: payload.email } });
  if (!findEmail) { 
    return next({ status: 400, message: 'Invalid fields' });
  }
  return next();
});

module.exports = { validToken };