const { Categorie } = require('../models');

const createCategory = async (name) => {
  if (name === undefined) return { err: { message: '"name" is required' }, status: 400 };
  try {
    const newCategory = await Categorie.create({ name });
    return newCategory;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

const getAllCategories = async () => {
  try {
    const allCategories = await Categorie.findAll();
    return allCategories;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};