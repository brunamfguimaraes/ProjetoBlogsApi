const { Category: CategoryModel } = require('../models');
const validations = require('../util/validations');
// const removeUserPass = require('../util/removeUserPass');
// const AppError = require('../util/appError');

// const codes = require('../util/httpCodes');
// const messages = require('../util/errorMessages');

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