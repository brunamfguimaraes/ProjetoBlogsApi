const categoryServices = require('../services/categoryServices');
const { Category } = require('../models');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await categoryServices.createCategory(name);
  if (newCategory.message) return next(newCategory);
  return res.status(201).json(newCategory);
};

const getCategories = async (_req, res) => {
  const categories = await Category.findAll();
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};