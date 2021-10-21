const validations = require('../validations/categories');
const { Category } = require('../../models');

async function createCategory(name) {
  validations.nameValidation(name);
  const result = await Category.create({ name });
  return result;
}

async function getCategories() {
  const result = await Category.findAll({});
  return result;
}

module.exports = {
  createCategory,
  getCategories,
};
