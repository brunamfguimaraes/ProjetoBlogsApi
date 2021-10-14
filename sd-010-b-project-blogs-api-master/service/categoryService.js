const { Category } = require('../models');
const { validateIfCategoryFieldsExist } = require('../middlewares/CategoryMiddleware');

const createCategoryService = async (body) => {
  const validateField = validateIfCategoryFieldsExist(body);
  if (validateField) return validateField;

  const category = await Category.create(body);
  return category;
};

const getAllCategorysService = async () => {
  const category = await Category.findAll();
  return category;
};

module.exports = { createCategoryService, getAllCategorysService };
