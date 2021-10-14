const { Category } = require('../models');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name });
  res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const allCategories = await Category.findAll();
  res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategories,
};