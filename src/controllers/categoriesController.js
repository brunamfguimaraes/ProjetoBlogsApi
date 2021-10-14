const categoriesService = require('../services/categoriesService');
const { CREATED, OK } = require('./msgStatus');

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const category = await categoriesService.createCategory(newCategory);
  return res.status(CREATED).json(category);
};

const getCategories = async (_req, res) => {
  const categories = await categoriesService.getCategories();
  return res.status(OK).json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};
