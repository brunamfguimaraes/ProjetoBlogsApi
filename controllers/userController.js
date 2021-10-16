const status = require('http-status');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const userService = require('../services/userService');
require('dotenv').config();

// JWT //
// const jwtConfig = {
//   expiresIn: '1d',
//   algorithm: 'HS256',
// };
// //    //

// const secretKey = process.env.JWT_SECRET;

const validNameEmailPassword = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const isValidDisplayName = userService.isValidDisplayName(displayName);
  const isValidEmail = userService.isValidEmail(email);
  const isValidPassword = userService.isValidPassword(password);

  if (isValidDisplayName) {
    return res.status(status.CREATED).json(
      { message: isValidDisplayName },
);
  }
    
  if (isValidEmail) {
    return res.status(status.CREATED).json({ message: isValidEmail });
  }
    
  if (isValidPassword) {
    return res.status(status.CREATED).json({ message: isValidPassword });
  }

  return res.status(status.CREATED).json(image);
};

// const existUser = userService.existUser(displayName);

//   if (!existUser) {
//     return res.status(status.CREATED).json({ message: 'User already registered' });
//   }

//   return res.status(status.CREATED).json(user);

module.exports = { createUser, validNameEmailPassword };