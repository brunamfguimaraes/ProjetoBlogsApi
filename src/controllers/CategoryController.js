const rescue = require('express-rescue');
const CategoryService = require('../services/CategoryService');

const newCategory = rescue(async (req, res, next) => {
  const categoryInfo = req.body;
  const category = await CategoryService.createCategory(categoryInfo);

  if (category.error) return next(category.error);

  res.status(201).json(category);
});

module.exports = {
  newCategory,
};