const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { Users } = require('../../models');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = jwt.verify(token, process.env.SECRET);

    req.payload = payload;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });  
  }
};

module.exports = validateToken;