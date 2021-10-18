const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const service = require('../services/userService');
require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwtConfiguration = {
  expiresIn: '1d', // tempo para garantir que o token não vai expirar tão cedo
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await service.createUser({ displayName, email, password, image });
    const token = jwt.sign({ data: newUser }, JWT_SECRET, jwtConfiguration);
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await service.loginUser({ email, password });
    if (login.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: login.message });
    }
    const token = jwt.sign({ data: login }, JWT_SECRET, jwtConfiguration);
    return res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const getAll = await service.getAllUsers();
    return res.status(StatusCodes.OK).json(getAll);    
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await service.getUserById({ id });
    if (getUser.error) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: getUser.message });
    }
    return res.status(StatusCodes.OK).json(getUser);    
  } catch (error) {
    console.log(error);
  }
};

module.exports = { 
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};
