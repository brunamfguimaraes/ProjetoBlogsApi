const { Category } = require('../../models');

const createCategory = async (newCategory) => {
  const category = await Category.create(newCategory);
  return category;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};
