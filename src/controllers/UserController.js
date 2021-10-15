const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const UserService = require('../services/UserService');

const jwtSecret = process.env.JWT_SECRET || 'test';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createJWT = (info) => {
  const newToken = jwt.sign(info, jwtSecret, jwtConfig);

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

  const token = createJWT({ ...response });

  res.status(200).json({ token });
});

const listUsers = rescue(async (req, res, _next) => {
  const response = await UserService.findUsers();

  res.status(200).json(response);
});

const findUser = rescue(async (req, res, next) => {
  const { id } = req.params;

  const response = await UserService.findUser(id);

  if (response.error) return next(response.error);

  res.status(200).json(response);
});

const deleteUser = rescue(async (req, res, next) => {
  const user = req.userData;

  const response = await UserService.removeUser(user);

  if (response.error) return next(response.error);

  res.status(204).json();
});
// const exemple = rescue(async (req, res, next) => {});

module.exports = { newUser, login, listUsers, findUser, deleteUser };
