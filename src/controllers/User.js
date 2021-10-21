const service = require('../services/User');

const getAll = async (_req, res) => {
  const result = await service.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id);
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

const remove = async (req, res) => {
  const { id } = req.user;
  await service.remove(id);
  return res.sendStatus(204);
};

module.exports = {
  login,
  create,
  remove,
  getAll,
  getById,
};
