const { Category } = require('../models');

const verifyBlogPostInformations = (title, content, categoryIds) => {
  if (!title) {
    const error = new Error('"title" is required');
    error.code = 400;

    throw error;
  }
  if (!content) {
    const error = new Error('"content" is required');
    error.code = 400;

    throw error;
  }
  if (!categoryIds) {
    const error = new Error('"categoryIds" is required');
    error.code = 400;

    throw error;
  }
};

const verifyCategoryIdExists = async (categoryIds) => {
  const category = await Promise.all(
    categoryIds.map(async (id) => {
      const isCategory = await Category.findOne({ where: { id } });
      return isCategory !== null;
    }),
  );

  if (category.includes(false)) {
    const error = new Error('"categoryIds" not found');
    error.code = 400;
    throw error;
  }
};

module.exports = { verifyBlogPostInformations, verifyCategoryIdExists };
