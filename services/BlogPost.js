const { BlogPost, User, Category } = require('../models');

const addPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

const getAllPosts = async () => {
  const postsLists = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return postsLists;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne(
    {
      include: [{
        where: { id },
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    },
  );

  if (!post) return null;

  return post;
};

const updatePost = async (id, { title, content }) => {
  const [updateBlogPost] = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  if (!updateBlogPost) return null;

  const { userId, categories } = await BlogPost.findOne({
    include: [{
      where: { id },
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return { title, content, userId, categories };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
