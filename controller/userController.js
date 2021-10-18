// const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { body } = req;
    const result = await userService.createUser(body);
    if (result.token) return res.status(result.status).json({ token: result.token });
    return res.status(result.status).json({ message: result.message });
};

const getAllUsers = async (_req, res) => {
    const result = await userService.getAllUsers();
    return res.status(result.status).json(result.users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getById(id);
  if (result.message) return res.status(result.status).json({ message: result.message });
  return res.status(result.status).json(result.user);
};

module.exports = { 
  createUser,
  getAllUsers,
  getById,
 };