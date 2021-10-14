const { Category } = require('../models');

const createCategory = async (name) => {
  if (!name) return { message: '"name" is required' };
  const checkCategory = await Category.findOne({ where: { name } });
  if (checkCategory) return { message: '"Category" already exists' };
  const { id } = await Category.create({ name });
  return { id, name };
};

module.exports = {
  createCategory,
};
