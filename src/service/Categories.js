const { Categories } = require('../models');

const createCategorie = async (categorie) => {
  const { id } = await Categories.create({ name: categorie });
  return id;
};

module.exports = {
  createCategorie,
};
