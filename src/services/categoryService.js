const { Category: CategoryModel } = require('../models');
const validations = require('../utils/validations');

const createCategory = async (name) => {
  await validations.verifyCategoryName(name);

  const category = await CategoryModel.create({ name });

  return category;
};

const getCategories = async () => {
  const categories = await CategoryModel.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};