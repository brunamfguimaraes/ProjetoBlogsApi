const { Category } = require('../models');

const create = async (name) => {
  if (!name) return { erro: { code: 400, message: '"name" is required' } };

  return Category.create({ name });
};

module.exports = { create };