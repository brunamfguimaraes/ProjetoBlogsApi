const service = require('../services/Category');

const create = async (req, res) => {
  const result = await service.create(req.body);
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await service.getAll();
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};
