const { Category } = require('../models');

const addCategory = async (name) => {
  const createCategory = await Category.create({ name });

  return createCategory;
};

const categoriesList = async () => {
  const listCategories = await Category.findAll();

  return listCategories;
};

module.exports = {
  addCategory,
  categoriesList,
};
