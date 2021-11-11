const { Categorie } = require('../models');

const getAllCategories = () => Categorie.findAll();

const createCategorie = async ({ name }) => {
  const newCategorie = await Categorie.create({ name });
  return newCategorie;
};

module.exports = {
  getAllCategories,
  createCategorie,
};
