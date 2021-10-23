const { Category } = require('../models');

const addCategory = async (name) => {
  if (name) {
    const category = await Category.create({ name });
    return category;
  }
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  addCategory,
  getAll,
};