const { Categorie } = require('../../models');

const create = async ({ name }) => {
  const newCategorie = await Categorie.create({ name });
  return newCategorie;
};

const getAll = () => Categorie.findAll();

module.exports = {
  create,
  getAll,
};
