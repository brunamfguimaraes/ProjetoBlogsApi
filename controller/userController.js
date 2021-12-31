const userService = require('../services/userServices');

const JWTgenerate = require('../middlewares/JWTgenerate');

const codes = require('../middlewares/codes');

const secret = 'meusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.create(userData);

    const token = JWTgenerate({ user }, jwtConfig, secret);

    return res.status(codes.created).json({ token });
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

const createLogin = async (req, res) => {
  try {
    const loginData = req.body;
    const user = await userService.createLogin(loginData);

    const token = JWTgenerate({ user }, jwtConfig, secret);

    return res.status(codes.ok).json({ token });
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

const getUsers = async (_req, res) => {
  try {
      const users = await userService.getUsers();
      return res.status(codes.ok).json(users);
  } catch (error) {
    const { code, message } = error;
      return res.status(code).json({ message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getById(id);

    res.status(codes.ok).json(user);
  } catch (error) {
    const { code, message } = error;
      return res.status(code).json({ message });
  }
};

module.exports = { create, createLogin, getUsers, getById };