const { Category } = require('../sequelize/models');

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  return newCategory;
};

const getAll = async () => Category.findAll();

module.exports = {
  createCategory,
  getAll,
};
