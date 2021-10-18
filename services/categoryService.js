const { Category } = require('../models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return getAll;
};

module.exports = { 
  createCategory,
  getAllCategories,
};
