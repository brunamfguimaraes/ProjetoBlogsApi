const code = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'seusecretdetoken';

const jwtValidations = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
     return res.status(code.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded, 'DECODED');
    const user = await User.findOne({ 
      email: decoded.data.email, 
    });
    
    if (!user) {
      return res.status(code.NOT_FOUND).json({ message: 'user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = jwtValidations;