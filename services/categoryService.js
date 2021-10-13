const { Category } = require('../models');

const registerCategory = async (body) => {
  const { name } = body;
  return Category.create({ name });
};

const getAllCategories = async () => Category.findAll();

module.exports = {
  registerCategory,
  getAllCategories,
};