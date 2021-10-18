const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfiguration = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (id, displayName, email) => {
  const payload = { id, displayName, email };
  return jwt.sign({ data: payload }, secret, jwtConfiguration);
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const answer = jwt.verify(token, secret);
    req.user = answer.data;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const tokenInfo = async (req) => {
  const token = req.headers.authorization;
  try {
    const answer = jwt.verify(token, secret);
    return answer.data.id;
  } catch (error) {
    return error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  tokenInfo,  
};
