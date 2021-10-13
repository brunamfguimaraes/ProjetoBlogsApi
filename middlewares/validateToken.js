const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next({ code: 'UNAUTHORIZED', message: 'Token not found' });
    } 
    
    jwt.verify(authorization, process.env.JWT_SECRET);
    
    return next();
  } catch (_err) {
      return next({ code: 'UNAUTHORIZED', message: 'Expired or invalid token' });
  }
};
