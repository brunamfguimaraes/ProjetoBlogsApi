const { Category } = require('../models');

const createCategoryServices = async (nameCategory) => {
  const response = await Category.create({ name: nameCategory });
  return response;
};

module.exports = {
  createCategoryServices,
};