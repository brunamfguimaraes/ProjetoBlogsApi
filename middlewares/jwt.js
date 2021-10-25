const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const { User } = require('../models');

const segredo = 'meusupersegredo';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' }); }
  try {
    const decoded = jwt.verify(token, segredo);
    const user = await User.findOne(
        { email: decoded.data.email, password: decoded.data.password },
    );
    console.log(user);
    if (!user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' }); 
    }
    req.user = user;
    next();
  } catch (_err) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;