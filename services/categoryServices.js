const { Category } = require('../models');

const createCategoryServices = async (nameCategory) => Category.create({ name: nameCategory });

module.exports = {
  createCategoryServices,
};