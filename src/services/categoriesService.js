const { Category } = require('../models');

function validateName(name) {
  if (!name) {
    return null;
  }

  return true;
}

async function create(body) {
  const newCategory = await Category.create(body);

  return newCategory;
}

async function getAllCategories() {
  const categories = await Category.findAll();

  return categories;
}

module.exports = { 
  create,
  validateName,
  getAllCategories,
};