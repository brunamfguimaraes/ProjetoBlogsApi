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

const updatedpost = async (body, id, token) => {
  const { title, content } = body;
  
  const verifyUser = await middlewares.validateUser(id, token);
  if (verifyUser) return verifyUser;
  
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  
  return BlogPost.findByPk(id, {
    attributes: { exclude: ['published', 'updated'] },
    include: { model: Category, as: 'categories' } });
};

const deletePost = async (id, token) => {
  const verifyPost = await middlewares.verifyPostById(id);
  if (verifyPost.message) return verifyPost;

  const verifyUser = await middlewares.validateUser(id, token);
  if (verifyUser) return verifyUser;

  return BlogPost.destroy({ where: { id } });
};

module.exports = {
  registerPost,
  getAllPosts,
  postById,
  updatedpost,
  deletePost,
};