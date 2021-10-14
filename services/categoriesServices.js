const { Category } = require('../models');

const createCategory = async (category) => {
const result = await Category.create(category);
return result;
};

const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
};