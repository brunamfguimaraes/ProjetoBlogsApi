const { Categories } = require('../models');

const { validateCategorieName } = require('../validations/index');

const createCategorie = async (name) => {
  const validateName = validateCategorieName(name);
  if (validateName.message) return validateName;
  
  const newCategorie = await Categories.create({ name });
  
  return newCategorie;
};

const getAllCategories = async () => {
  const getCategories = await Categories.findAll();

  return getCategories;
};

module.exports = {
  createCategorie,
  getAllCategories,
};