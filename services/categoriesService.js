const { Category } = require('../models');

const createNewCategory = async (name) => {
  try {
    const created = await Category.create({ name });
    return created;
  } catch (error) {
    throw new Error('"name" is required');
  }
};

const allCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { createNewCategory, allCategories };
