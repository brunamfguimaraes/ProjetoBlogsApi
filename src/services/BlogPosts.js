const { checkPostEntries, checkCategories } = require('../validations/BlogPosts');
const { BlogPost } = require('../models');

const createBlogPost = async ({ title, userId, content, categoryIds }) => {
  const entries = checkPostEntries({ title, userId, content, categoryIds });
  if (entries.message) return entries;

  const categoryIsNull = await checkCategories(categoryIds);
  if (categoryIsNull) return { message: '"categoryIds" not found' };

  return BlogPost.create({ title, userId, content });
}; 

module.exports = {
  createBlogPost,
}; 