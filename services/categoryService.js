const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return { message: '"name" is required', status: 400 };

  const create = await Category.create({ name });
  return create;
};

const getAllCategories = async () => {
  const getAll = await Category.findAll();
  return getAll;
};

module.exports = {
  createCategory,
  getAllCategories,
};