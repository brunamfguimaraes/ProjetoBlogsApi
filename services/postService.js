const middlewares = require('../middlewares');
const { User, BlogPost, Category } = require('../models');

const registerPost = async (body, token) => {
  const { title, categoryIds, content } = body;
  const userId = middlewares.decodeToken(token);
  
  const verifyCategory = await middlewares.existsCategory(categoryIds);
  if (verifyCategory) return verifyCategory;

  return BlogPost.create({ title, content, userId });
};

const getAllPosts = async () => BlogPost.findAll({
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] });

const postById = async (id) => middlewares.verifyPostById(id);

module.exports = {
  registerPost,
  getAllPosts,
  postById,
};