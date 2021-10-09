const rescue = require('express-rescue');

const { createUserService, getUsers, getUserById } = require('../service/userService');

const createUser = rescue(async (req, res, _next) => {
  const { token } = req;
  await createUserService(req.body);
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

module.exports = {
  createUser,
  getAllUsers,
  getUser,
};
