const userService = require('../services/userService');

const getAll = async (req, res) => {
  const result = await userService.getAll();
  return res.status(200).json(result);
};

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const token = await userService.login(req.body);
  return res.status(200).json({ token });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  return res.status(200).json(user);
};

const removeUser = async (req, res) => {
  const { id } = req.user;
  await userService.removeUser(id);
  return res.sendStatus(204);
};

module.exports = {
  removeUser,
  getUserById,
  createUser,
  login,
  getAll,
};
