const { Category } = require('../models');

const validateCreateCategory = ({ name }) => {
  if (!name) {
    return { code: 400, message: '"name" is required' };
  }
  const createCategory = Category.create({ name });
  return createCategory;
};

const validateFindCategories = async () => {
  const findCategories = await Category.findAll();
  return findCategories;
};

module.exports = {
  validateCreateCategory,
  validateFindCategories,
};