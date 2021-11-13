const { BlogPosts, Categories, User } = require('../models');

const { validateBlogPosts } = require('../validations/index');

const createBlogPost = async (title, content, categoryId) => {
  const blogPostIsValid = validateBlogPosts(title, content, categoryId);
  if (blogPostIsValid.message) return blogPostIsValid;

  const verifyCategory = await Categories.findOne({ where: { id: categoryId } });
  // console.log(categoryId);
  if (!verifyCategory) return { message: '"categoryIds" not found' };

  const published = new Date();
  const updated = published;

  const newPost = await BlogPosts
  .create({ title, content, categoryId, published, updated });

  return newPost;
};

const findAllBlogPosts = async () => {
  const findAll = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return findAll;
};

const findById = async (id) => {
  console.log(id);
  const findBlogPost = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (findBlogPost === [] || !findBlogPost) return { message: 'Post does not exist' };

  return findBlogPost;
};

module.exports = {
  createBlogPost,
  findAllBlogPosts,
  findById,
};