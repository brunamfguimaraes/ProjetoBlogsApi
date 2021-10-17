const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const { name } = req.body;
  const result = await categoriesService.create(name);
  if (result.code) { return res.status(result.code).json({ message: result.message }); }
  res.status(201).json({ id: result, name });
};

const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();
  return res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};