const jwt = require('jsonwebtoken');
const { findByEmail } = require('../service/userService');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }
  
  try {
  const decoded = await jwt.verify(token, secret);
  const { email } = decoded.data;
  const userInfo = await findByEmail(email);
  const userId = userInfo.dataValues.id;
  
  req.user = userId;
  } catch (e) {
    return res.status(401).send({ message: 'Expired or invalid token' });
  } 
  return next();
};

module.exports = tokenValidation;