const service = require('../services/UserService');

const getUsers = async (req, res) => {
  const result = await service.getUsers();

  return res.status(200).json(result);
};

const createUser = async (req, res) => {
  const jwt = await service.createUser(req.body);

  return res.status(201).json({ jwt });
};

const userLogin = async (req, res) => {
  const jwt = await service.userLogin(req.body);

  return res.status(200).json({ jwt });
};

module.exports = {
  getUsers,
  createUser,
  userLogin,
};
