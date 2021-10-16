const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const newCategory = await categoriesService.createCategory(req.body);
  if (newCategory.err) return res.status(newCategory.err.status).json(newCategory.err.message);
  return res.status(newCategory.resp.status).json(newCategory.resp.content);
};

const getAll = async (req, res) => {
  const all = await categoriesService.getAll();
  if (all.err) return res.status(all.err.status).json(all.err.message);
  return res.status(all.resp.status).json(all.resp.content);
};

module.exports = {
  createCategory,
  getAll,
};