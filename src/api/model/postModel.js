const { PostsCategories, Categories, BlogPost, Users } = require('../../models');

const addNewPost = (title, categoryIds, content) => {
  const resultAdd = PostsCategories.create({
    title, categoryIds, content,
  });
  return resultAdd;
};

const getPostAll = async () => BlogPost.findAll({
    include: [
      { model: Users, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

const getPostById = async (postId) => PostsCategories.findOne({ where: { postId } });

const getCategoryId = async (id) => {
  const result = await Categories.findOne({ where: { id } });
  return result;
};

const addNewBlogs = async ({ userId, title, content }) => {
  const resultBlogs = await BlogPost.create({ userId, title, content });
  return resultBlogs;
};

module.exports = { addNewPost,
  getPostAll,
  getPostById,
  getCategoryId,
  addNewBlogs };