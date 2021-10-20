const { Category } = require('../models');

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return getAll;
};

// https://sequelize.org/master/manual/model-querying-finders.html
const findCategoryId = async (id) => {
  const categoryId = await Category.findByPk(id);
  if (!categoryId) {
    return { error: true, message: '"categoryIds" not found', status: 400 };
  }
  return categoryId;
};

module.exports = { 
  createCategory,
  getAllCategories,
  findCategoryId,
};
