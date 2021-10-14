const { Category } = require('../../models');

const createCategory = async (newCategory) => {
  const category = await Category.create(newCategory);
  return category;
};

module.exports = {
  createCategory,
};
