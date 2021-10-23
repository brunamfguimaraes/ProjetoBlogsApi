const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { User } = require('../models');
require('dotenv').config();

// const { JWT_SECRET } = process.env;
// const JWT_SECRET = 'projectBlogsAPI';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' }); }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ where: { id: data.userID } });
    // const validPassword = await User.findOne({ password: user.password });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' }); 
    }
    req.user = user;
    next();
  } catch (_err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;