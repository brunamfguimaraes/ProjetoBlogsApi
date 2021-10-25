const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const post = await BlogPost.create({ title, content, categoryIds, userId });
  return post;
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
  
  console.log('===========', posts);
  return posts;
};

module.exports = {
  createPost,
  getAll,
};
