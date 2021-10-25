const { Category } = require('../models');

const validateCreateCategory = ({ name }) => {
  const createCategory = Category.create({ name });
  return createCategory;
};

module.exports = {
  validateCreateCategory,
};