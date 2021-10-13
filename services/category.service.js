const { Category } = require('../models');
const CategoryValidation = require('../schemas/category.validation');

const createCategory = async (name) => {
  CategoryValidation.verifyCategoryName(name);

  try {
    const newCategory = await Category.create({ name });
    return newCategory;
  } catch (error) {
    return error;
  }
};

const getAllCategories = async () => {
  try {
    const allCategories = await Category.findAll({});
    return allCategories;
  } catch (error) {
    return error;
  }
};

module.exports = { createCategory, getAllCategories };
