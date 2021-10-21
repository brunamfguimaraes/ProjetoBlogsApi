const validations = require('../validations/categories');
const { Category } = require('../../models');

async function createCategory(name) {
  validations.nameValidation(name);
  const result = await Category.create({ name });
  return result;
}

module.exports = {
  createCategory,
};
