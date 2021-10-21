const service = require('../services/categories');

async function createCategory(req, res) {
  const { name } = req.body;
  const result = await service.createCategory(name);
  return res.status(201).json(result);
}

async function getCategories(req, res) {
  const result = await service.getCategories();
  return res.status(200).json(result);
}

module.exports = {
  createCategory,
  getCategories,
};
