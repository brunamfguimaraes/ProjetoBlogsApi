const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/userService');

const create = async (req, res) => {
  const userData = req.body;
  
  const newUser = await UserService.createUser(userData);

  if (newUser.Error) return res.status(newUser.code).json({ message: newUser.message });

  return res.status(StatusCodes.CREATED).json({ message: newUser });
};

const getAll = async (req, res) => {
  const allUsers = await UserService.getAll();

  res.status(StatusCodes.OK).json(allUsers);
};

module.exports = {
  create,
  getAll,
};
