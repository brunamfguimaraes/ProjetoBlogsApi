const { Category } = require('../models');

const createCategoryServices = async (nameCategory) => {
  const response = await Category.create({ name: nameCategory });
  return response;
};

const getAllCategoriesServices = async () => {
  const response = await Category.findAll();
  return response;
}; 

module.exports = {
  createCategoryServices,
  getAllCategoriesServices,
};