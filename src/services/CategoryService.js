const { Category } = require('../../models');

const newCategory = async (name) => {
  if (!name || name.length < 1) {
    return { message: '"name" is required' };
  }

  return Category.create({ name });
};

const getCategories = async () => Category.findAll();

module.exports = {
  newCategory,
  getCategories,
};
