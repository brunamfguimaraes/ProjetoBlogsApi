const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'minha senha';

const createJWT = (payload) => {
  const newToken = jwt.sign(payload, secret, {
    algorithm: 'HS256',
  });
  return newToken;
};

const verifyJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(authorization, secret);
    req.user = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  return next();
};

module.exports = { 
  createJWT,
   verifyJWT, 
  };