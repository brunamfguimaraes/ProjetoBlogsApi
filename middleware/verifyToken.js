const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const secretPassword = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log('verify', token);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secretPassword);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(401).json(({ message: 'Expired or invalid token' }));
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json(({ message: 'Expired or invalid token' }));
  }  
  next();
};

module.exports = verifyToken;