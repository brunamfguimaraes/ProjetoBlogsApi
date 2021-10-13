const { Category } = require('../models');

const postCategoryService = async (name) => {
  if (!name) {
    return { code: 'BAD_REQUEST', message: '"name" is required' };
  }

  return Category.create({ name });
};

module.exports = { postCategoryService };
