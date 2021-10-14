const middlewares = require('../middlewares');
const { User, BlogPost, Category } = require('../models');

const registerPost = async (body, token) => {
  const { title, categoryIds, content } = body;
  const userId = middlewares.decodeToken(token);
  
  const verifyCategory = await middlewares.existsCategory(categoryIds);
  if (verifyCategory) return verifyCategory;

  const newPost = await BlogPost.create({ title, content, userId });
  return newPost;
};

const getAllPosts = async () => BlogPost.findAll({
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });

module.exports = {
  registerPost,
  getAllPosts,
};