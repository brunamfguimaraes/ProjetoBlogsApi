const { Category } = require('../models');
const { validateIfCategoryFieldsExist } = require('../middlewares/CategoryMiddleware');

const createCategoryService = async (body) => {
  const validateField = validateIfCategoryFieldsExist(body);
  if (validateField) return validateField;

  const category = await Category.create(body);
  return category;
};

module.exports = { createCategoryService };
