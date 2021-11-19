const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

const HTTP = {
  Unauthorized: 401,
};

const checkExistence = (token) => {
  if (!token || token === '') return false;
  return true;
};

const secret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers; let user;
  
  if (!checkExistence(authorization)) {
    return res.status(HTTP.Unauthorized).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, secret);
    
    if (decoded.data) {
      user = await User.findOne({ where: { email: decoded.data } });
    }

    if (user) { 
      req.email = decoded.data;
      next(); 
    }
  } catch (_e) {
    return res.status(HTTP.Unauthorized).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken; 