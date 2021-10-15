const { Category } = require('../models');

const createCategory = async (req, res) => {
  const { body } = req;
  const newCategory = await Category.create(body);
  res.status(201).json(newCategory);
};

const getAll = async (req, res) => {
  const allCategories = await Category.findAll();
  res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getAll,
};