const { BlogPost } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');

const createPost = async (post, id) => {
  const postWithUser = {
    title: post.title,
    content: post.content,
    userId: id,
  };
  const result = await BlogPost.create(postWithUser);
  return result;
};

const findCategory = async (ids) => {
  const result = await ids.map((id) => Category.findOne({ where: { id } }));
  return Promise.all(result).then((values) => values);
};

const getAll = async () => {
  const result = await BlogPost.findAll({ 
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return result;
};

const getOne = async (id) => {
  const result = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return result;
};

module.exports = {
  createPost,
  findCategory,
  getAll,
  getOne,
};