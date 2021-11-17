const Sequelize = require('sequelize');
const { Categorie } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createNewCategorie = async (displayName, email, password, image) => {
  const newCategory = await sequelize.transaction(async (t) => {
    const categorie = await Categorie.create({ displayName, email, password, image }, 
      { transaction: t });

    return categorie;
  });

  return newCategory;
};

module.exports = {
  createNewCategorie,
};
