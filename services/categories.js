const { Category } = require('../models');

const MyError = require('./errorClass');

async function createCategory(category) {
  if (!category.name) {
    throw new MyError('"name" is required', 400);
  }
  const newCategory = await Category.create(category);
  return newCategory;
}

async function getCategories() {
  const categories = await Category.findAll();
  return categories;
}

module.exports = {
  createCategory,
  getCategories,
};