const jwt = require('jsonwebtoken');
const { errorToken } = require('../error/constructErro');
require('dotenv').config();

const validToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return next(errorToken('Token not found'));
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    req.userId = payload.payload.id;
    return next();
  } catch (error) {
    return next(errorToken('Expired or invalid token'));  
  }
};

module.exports = validToken;
