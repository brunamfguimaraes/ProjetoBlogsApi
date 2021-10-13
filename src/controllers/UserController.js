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
  const response = await UserService.createUser(userInfo);
  
  if (response.error) return next(response.error);
  
  const token = createJWT(userInfo);
  
  res.status(201).json({ token });
});

const login = rescue(async (req, res, next) => {
  const loginInfo = req.body;

  const response = await UserService.loginUser(loginInfo);

  if (response.error) return next(response.error);
  
  const token = createJWT(loginInfo);
  
  res.status(200).json({ token });
});

const listUsers = rescue(async (req, res, _next) => {
  const response = await UserService.findUsers();

  res.status(200).json(response);
});
// const exemple = rescue(async (req, res, next) => {});

module.exports = { newUser, login, listUsers };
