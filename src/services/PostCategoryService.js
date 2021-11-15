const { PostCategory } = require('../../models');

const newCategory = async (name) => {
  if (!name || name.length < 1) {
    return { message: '"name" is required' };
  }

  return PostCategory.create({ name });
};

const getCategories = async () => PostCategory.findAll();

module.exports = {
  newCategory,
  getCategories,
};
