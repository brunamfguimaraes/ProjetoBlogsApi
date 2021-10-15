const service = require('../services/User');

const getAll = async (req, res) => {
  const result = await service.getAll();
  return res.status(200).json(result);
};

const create = async (req, res) => {
  const token = await service.create(req.body);
  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const token = await service.login(req.body);
  return res.status(200).json({ token });
};

module.exports = {
  getAll,
  create,
  login,
};
