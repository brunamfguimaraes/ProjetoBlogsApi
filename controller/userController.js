// const rescue = require('express-rescue');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { body } = req;
    const result = await userService.createUser(body);
    if (result.token) return res.status(result.status).json({ token: result.token });
    res.status(result.status).json({ message: result.message });
};

const getAllUsers = async (_req, res) => {
    const result = await userService.getAllUsers();
    console.log('oi');
    res.status(result.status).json(result.users);
};

module.exports = { 
  createUser,
  getAllUsers,
 };