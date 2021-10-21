const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token not found',
    }); 
  }
  
  try {
    const payload = jwt.verify(token, secret);
    const { email } = payload;

    req.user = { email };
    
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = {
  jwt,
  jwtConfiguration,
  validateJWT,
};