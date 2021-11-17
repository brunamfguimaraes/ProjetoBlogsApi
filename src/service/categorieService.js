const Sequelize = require('sequelize');
const { Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createNewCategorie = async (name) => {
  const newCategory = await sequelize.transaction(async (t) => {
    const category = await Category.create({ name }, 
      { transaction: t });

    return category;
  });

  return newCategory;
};

const findAllCategories = async () => Category.findAll();

module.exports = {
  createNewCategorie,
  findAllCategories,
};
