const Sequelize = require('sequelize');
const { Categorie } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createNewCategorie = async (name) => {
  const newCategory = await sequelize.transaction(async (t) => {
    const categorie = await Categorie.create({ name }, 
      { transaction: t });

    return categorie;
  });

  return newCategory;
};

const findAllCategories = async () => Categorie.findAll();

module.exports = {
  createNewCategorie,
  findAllCategories,
};
