const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return { message: '"name" is required', status: 400 };

  const create = await Category.create({ name });
  return create;
};

module.exports = {
  createCategory,
};