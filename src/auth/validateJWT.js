require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, NOT_FOUND } = require('http-status');

const User = require('../models');

const secret = process.env.SECRET || 'notSoSecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(NOT_FOUND.json({ message: 'user not found' }));

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(UNAUTHORIZED).json({ message: error.message });
  }
};