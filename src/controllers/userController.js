const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/userService');

const create = async (req, res) => {
  const userData = req.body;
  
  const newUser = await UserService.createUser(userData);

  if (newUser.Error) return res.status(newUser.code).json({ message: newUser.message });

  res.status(StatusCodes.CREATED).json({ message: newUser });
};

const getAll = async (req, res) => {
  const allUsers = await UserService.getAll();

  res.status(StatusCodes.OK).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getById(id);

  if (user.Error) return res.status(user.code).json({ message: user.message });

  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};
