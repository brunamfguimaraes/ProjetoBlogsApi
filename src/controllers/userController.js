const userService = require('../services/userService');
const { CREATED, OK } = require('./msgStatus');

const createUser = async (req, res) => {
  const newUser = req.body;
  const user = await userService.createUser(newUser);
  return res.status(CREATED).json(user);
};

const login = async (req, res) => {
  const user = req.body;
  const token = await userService.login(user);
  return res.status(OK).json(token);
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  return res.status(OK).json(user);
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
};
