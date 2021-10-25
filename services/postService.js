const { BlogPost } = require('../models');
const { findCategory } = require('../validations/validations');

const createPost = async ({ title, content, userId, categoryIds }) => {  
  const categoryNotFound = await findCategory(categoryIds);

  if (categoryNotFound !== true) return { message: categoryNotFound.message };

  const { id } = await BlogPost.create({
      title, content, userId,
  });

  return { id, userId, title, content };
};

module.exports = {
  createPost,
};