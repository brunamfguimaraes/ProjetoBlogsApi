const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createJWT = async (payload) => {
  const newToken = jwt.sign(payload, secret, {
    algorithm: 'HS256',
  });
  return newToken;
};

const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload.user;
    return next();
  } catch (err) {
    const message = 'Expired or invalid token';
    return res.status(401).json({ message });
  }
};

module.exports = { 
  createJWT,
   verifyJWT, 
  };