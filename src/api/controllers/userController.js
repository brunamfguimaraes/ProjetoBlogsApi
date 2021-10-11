const rescue = require('express-rescue');

const {
  createUserService,
  getUsers,
  getUserById,
  deleteUserService,
} = require('../service/userService');
const { tokenGenerator } = require('../utils/createToken');

const createUser = rescue(async (req, res, _next) => {
  await createUserService(req.body);
  const token = tokenGenerator(req.body);
  return res.status(201).json({ token });
});

const getAllUsers = rescue(async (req, res) => {
  const users = await getUsers();
  return res.status(200).json(users);
});

const getUser = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.status(200).json(user);
});

const deleteUser = rescue(async (req, res) => {
  const { user } = req;
  await deleteUserService(user);
  return res.status(204).end();
});

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
};
