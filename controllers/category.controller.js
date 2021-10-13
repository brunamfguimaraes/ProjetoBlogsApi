const CategoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await CategoryService.createCategory(name);
  return res.status(201).json(newCategory);
};
const getAllCategories = async (req, res) => {
  const allCategories = await CategoryService.getAllCategories();
  return res.status(200).json(allCategories);
};

module.exports = { createCategory, getAllCategories };
