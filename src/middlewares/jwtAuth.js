const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService.js');

const jwtSecret = process.env.JWT_SECRET || 'test';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { email } = jwt.verify(token, jwtSecret);
    
    const user = await UserService.verifyLogin({ email });

    req.userData = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return true;
};
