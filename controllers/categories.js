const services = require('../services/categories');

async function createCategory(req, res) {  
  const result = await services.createCategory(req.body);
  return res.status(201).json({
    id: result.id,
    name: result.name,
  });
}

async function getCategories(req, res) {
  const result = await services.getCategories();
  return res.status(200).json(result);
}

module.exports = {
  createCategory,
  getCategories,
};