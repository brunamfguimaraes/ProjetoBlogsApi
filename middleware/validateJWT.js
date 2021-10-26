const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
     return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findOne({ 
      email: decoded.data.email, 
    });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log('Erro do Catch', err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;