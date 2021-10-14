const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name || name === '') return { message: '"name" is required' };

  return Category.create({ name });
};

const getAllCategories = async () => Category.findAll();

module.exports = {
  createCategory,
  getAllCategories,
};