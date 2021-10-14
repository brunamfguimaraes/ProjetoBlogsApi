const { Category, BlogPost } = require('../models');

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
const verifyPostBlogCreator = async (id, user) => {
  const userId = user.id;
  console.log(id);
  const postBlog = await BlogPost.findOne({ where: { id } });
  if (Number(postBlog.userId) !== userId) {
    const error = new Error('Unauthorized user');
    error.code = 401;
    throw error;
  }
};

const verifyUpdateFields = (body) => {
  const { categoryIds, title, content } = body;
  if (categoryIds) {
    const error = new Error('Categories cannot be edited');
    error.code = 400;
    throw error;
  }
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
};

module.exports = {
  verifyBlogPostInformations,
  verifyCategoryIdExists,
  verifyPostBlogCreator,
  verifyUpdateFields,
};
