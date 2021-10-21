const service = require('../services/user');

async function createUser(req, res) {
  const { displayName, email, password, image } = req.body;
  const result = await service.createUser(displayName, email, password, image);
  return res.status(201).json({ token: result });
}

async function login(req, res) {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  return res.status(200).json({ token: result });
}

async function getUsers(_req, res) {
  const result = await service.getUsers();
  return res.status(200).json(result);
}

async function getUserById(req, res) {
  const { id } = req.params;
  const result = await service.getUserById(id);
  return res.status(200).json(result);
}

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
};
