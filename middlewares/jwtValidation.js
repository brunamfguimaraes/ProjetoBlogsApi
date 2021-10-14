require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = 'meusecretdetoken';

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
    try {
      const payload = jwt.verify(token, secret);
      const { _id } = payload.data;
      req.user = { userId: _id };
      next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { jwtValidation };