require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;
    req.userId = id;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};