const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env;

const jwtConfiguration = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'missing auth token',
    }); 
  }
  
  try {
    const payload = jwt.verify(token, SECRET);
    const { id, email } = payload;

    req.user = { id, email };
    
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'jwt malformed',
    });
  }
};

module.exports = {
  jwt,
  jwtConfiguration,
  validateJWT,
};