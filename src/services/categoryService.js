const { Category } = require('../sequelize/models');

const newCategory = async ({ name }) => {
  const created = await Category.create({ name });

  console.log('criado', created);
  return created;
};

const getAll = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

module.exports = { newCategory, getAll };
