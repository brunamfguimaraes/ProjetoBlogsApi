const { Categories } = require('../models');

const createCategorie = async (categorie) => {
  const { id } = await Categories.create({ name: categorie });
  return id;
};

const findAllCategories = async () => {
  const allCategories = await Categories.findAll();
  return allCategories;
};

const getLastCategoryId = async () => {
  const categories = await findAllCategories();
  return categories.slice(-1)[0].dataValues.id;
};

module.exports = {
  createCategorie,
  findAllCategories,
  getLastCategoryId,
};
