require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const password = process.env.JWT_SECRET;
    const visibleToken = jwt.verify(token, password);

    const userAuth = await User.findOne({ where: { email: visibleToken.email } });

    if (userAuth.email !== visibleToken.email) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = userAuth;

    next();
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = validateToken;