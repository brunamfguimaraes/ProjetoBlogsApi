const { BlogPosts, Users, PostsCategories, Categories } = require('../models');

const findUserByEmail = async (email) => {
  const { id } = await Users.findOne({ where: { email } });
  return id;
};

const createPost = async (title, content, categoryIds, userId) => {
  const published = Date.now();
  const categories = categoryIds;
  const { id } = await BlogPosts.create({ title, content, userId, published });
  await categories.forEach(async (categoryId) => {
    const postId = id;
    await PostsCategories.create({ categoryId, postId });
  });
  return id;
};

const getAllPosts = async () => {
  const allPosts = await BlogPosts.findAll({
    // Ederson me ajudou nessa >:)
    include: [
    {
      model: Users,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Categories,
      as: 'categories',
      attributes: {
        exclude: ['PostsCategories'],
      },
      through: { attributes: [] },
    }],
  });

  return allPosts;
};

const getPostById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [{
      model: Users,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Categories,
      as: 'categories',
      attributes: { exclude: ['PostsCategories'] },
      through: { attributes: [] },
    }],
  });
  return post;
};

module.exports = {
  createPost,
  findUserByEmail,
  getAllPosts,
  getPostById,
};
