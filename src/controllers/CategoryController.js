const rescue = require('express-rescue');
const CategoryService = require('../services/CategoryService');

const newCategory = rescue(async (req, res, next) => {
  const categoryInfo = req.body;
  const category = await CategoryService.createCategory(categoryInfo);

  if (category.error) return next(category.error);

  res.status(201).json(category);
});

const listCategories = rescue(async (req, res, next) => {
  const categories = await CategoryService.findCategories();

  if (categories.error) return next(categories.error);

  res.status(200).json(categories);
});

module.exports = {
  newCategory,
  listCategories,
};