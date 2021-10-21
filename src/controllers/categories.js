const service = require('../services/categories');

async function createCategory(req, res) {
  const { name } = req.body;
  const result = await service.createCategory(name);
  return res.status(201).json(result);
}

module.exports = {
  createCategory,
};
