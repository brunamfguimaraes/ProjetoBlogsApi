const { Category } = require('../models');

const createCategory = async (category) => {
const result = await Category.create(category);
return result;
};

module.exports = {
  createCategory,
};