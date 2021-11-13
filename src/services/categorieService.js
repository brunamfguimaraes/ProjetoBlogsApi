const { Category } = require('../models');

const getAllCategories = () => Category.findAll();

const createCategorie = async ({ name }) => {
  const newCategorie = await Category.create({ name });
  return newCategorie;
};

module.exports = {
  getAllCategories,
  createCategorie,
};
