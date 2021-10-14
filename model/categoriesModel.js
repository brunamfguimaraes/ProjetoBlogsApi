const { Categories } = require('../models');

const createCategories = async (name) => {
  const categories = await Categories.create({ name });
  return categories;
};

const getAll = async () => {
  const categories = await Categories.findAll();
  return categories;
};

const getCategoryById = async (id) => {
  const result = await Categories.findOne({ where: { id } });

  return result;
};

module.exports = {
  createCategories,
  getAll,
  getCategoryById,
};