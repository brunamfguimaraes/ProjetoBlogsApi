const { Category } = require('../models');

const postCategoryService = async (name) => {
  if (!name) {
    return { code: 'BAD_REQUEST', message: '"name" is required' };
  }

  return Category.create({ name });
};

const getCategoriesService = () => Category.findAll();

module.exports = { postCategoryService, getCategoriesService };
