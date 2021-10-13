const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const UserService = require('../services/UserService.js');

const jwtSecret = process.env.JWT_SECRET || 'test';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createJWT = (info) => {
  const { email, password } = info;
  const newToken = jwt.sign({ email, password }, jwtSecret, jwtConfig);
  
  return newToken;
};

const newUser = rescue(async (req, res, next) => {
  const userInfo = req.body;
  const user = await UserService.createUser(userInfo);

  if (user.error) return next(user.error);

  const token = createJWT(userInfo);

  res.status(201).json({ token });
});

module.exports = { newUser };
