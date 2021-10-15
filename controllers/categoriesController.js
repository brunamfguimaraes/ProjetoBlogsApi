const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const newCategory = await categoriesService.createCategory(req.body);
  if (newCategory.err) return res.status(newCategory.err.status).json(newCategory.err.message);
  return res.status(newCategory.resp.status).json(newCategory.resp.content);
};

module.exports = {
  createCategory,
};