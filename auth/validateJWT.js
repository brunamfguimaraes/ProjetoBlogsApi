const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
require('dotenv').config();

// const { JWT_SECRET } = process.env;
// const JWT_SECRET = 'projectBlogsAPI';
const JWT_SECRET = 'lucas-lotar-secret';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' }); }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findOne({ email: decoded.data.email, password: decoded.data.password });
      
    if (!user) res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' }); 
    
    req.user = user;
    next();
  } catch (_err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;