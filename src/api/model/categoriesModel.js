const { Categories } = require('../../models');

const createCategories = async (name) => {
  const resultCategories = await Categories.create({ name });
  return resultCategories;
};

const getAll = async () => Categories.findAll();

module.exports = { createCategories, getAll };
