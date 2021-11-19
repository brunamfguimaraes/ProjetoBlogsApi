require('dotenv').config();
const UserService = require('../services/userService');
const codes = require('../utils/httpCodes');
const generateToken = require('../utils/generateJWT');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await UserService.createUser(userData);

    const token = generateToken({ user }, jwtConfig, secret);

    return res.status(codes.created).json({ token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const loginData = req.body;

    const user = await UserService.login(loginData);

    const token = generateToken({ user }, jwtConfig, secret);

    return res.status(codes.ok).json({ token });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const getUsers = async (_req, res, next) => {
  try {
    const users = await UserService.getUsers();

    return res.status(codes.ok).json(users);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);

    return res.status(codes.ok).json(user);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    await UserService.deleteUser(id);

    return res.status(codes.noContent).json();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
};