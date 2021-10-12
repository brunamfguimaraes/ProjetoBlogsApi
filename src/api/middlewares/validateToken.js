const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { Users } = require('../../models');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(token, process.env.SECRET);

    req.payload = payload;

    return next();
  } catch (error) {
    next(error);  
  }
};

module.exports = validateToken;