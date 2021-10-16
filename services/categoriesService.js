const { Categories } = require('../models');

const createCategories = async (name) => {
  const category = await Categories.create(name);
  return category;
};

const allCategories = async () => {
  const categories = await Categories.findAll();
  return categories;
};

module.exports = { 
  createCategories, 
  allCategories,
};