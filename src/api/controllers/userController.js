const rescue = require('express-rescue');

const { createUserService, getUsers } = require('../service/userService');

const createUser = rescue(async (req, res, _next) => {
  const { token } = req;
  await createUserService(req.body);
  return res.status(201).json({ token });
});

const getAllUsers = rescue(async (req, res) => {
  const users = await getUsers();
  return res.status(200).json(users);
});

module.exports = {
  createUser,
  getAllUsers,
};
