const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtError = {
  message: 'Expired or invalid token',
};

const missingJwtError = {
  message: 'Token not found',
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json(missingJwtError);

  try {
    const decoded = jwt.verify(token, secret);
    
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json(jwtError);
  }
};

module.exports = validateToken;