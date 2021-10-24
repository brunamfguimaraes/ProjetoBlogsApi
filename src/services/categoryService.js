const { Category } = require('../sequelize/models');

const createCategory = async (name) => {
  const newCategory = await Category.create(name);
  return newCategory;
};

module.exports = {
  createCategory,
};
