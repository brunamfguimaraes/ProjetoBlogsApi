const { Categories } = require('../../models');

const createCategories = async (name) => {
  console.log('aqui model');
  const resultCategories = await Categories.create({ name });
  console.log('saindo model');
  return resultCategories;
};

module.exports = { createCategories };
