const { Category } = require('../models');
const { dataIsRequired } = require('../helper/errorFunctions');

const createCategory = async (categoryData) => {
  const { name } = categoryData;
  if (!name) return dataIsRequired('name');

  const newCategory = await Category.create(categoryData);

  return { ...newCategory.dataValues };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const hasCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    return false;
  }

  return true;
};

module.exports = {
  createCategory,
  getAllCategories,
  hasCategoryById,
};