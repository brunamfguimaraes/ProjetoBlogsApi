const { BlogPosts, Categories } = require('../models');

const { validateBlogPosts } = require('../validations/index');

const createBlogPost = async (title, content, categoryIds) => {
  const blogPostIsValid = validateBlogPosts(title, content, categoryIds);
  if (blogPostIsValid.message) return blogPostIsValid;

  const verifyCategory = await Categories.findOne({ where: { id: categoryIds } });
  // console.log(verifyCategory);
  if (!verifyCategory) return { message: '"categoryIds" not found' };

  const newPost = await BlogPosts.create({ title, content, categoryIds });

  return newPost;
};

module.exports = {
  createBlogPost,
};