const JWT = require('jsonwebtoken');
const { User } = require('../models');
const MyError = require('../services/errorClass');

async function userExists(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function checkToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return next(new MyError('Token not found', 401));

  try {
    const decoded = JWT.verify(authorization, 'tigre');
    const user = await userExists(decoded.email);
    if (!user) return next(new MyError('Expired or invalid token', 404));
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = checkToken;