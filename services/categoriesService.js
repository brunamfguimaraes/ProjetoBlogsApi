const { Category } = require('../models');
const categoriesValidation = require('../validations/cotegoriesValidations');

const addCategories = async (name, token) => {
  categoriesValidation.validName(name);
  categoriesValidation.validToken(token);
  const createCategory = await Category.create({ name });
  return createCategory.dataValues;
};

const getCategories = async (token) => {
  categoriesValidation.validToken(token);
  const categories = await Category.findAll();
  const result = categories.map((category) => category.dataValues);
  return result;
};

module.exports = {
  addCategories,
  getCategories,
};