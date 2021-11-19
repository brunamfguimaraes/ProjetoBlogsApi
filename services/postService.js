const httpStatus = require('http-status');

const { BlogPost, User, Category } = require('../models');
const validate = require('../utils/validation');

const createPost = async ({ title, content, categoryIds }, { id }) => {
  await validate.createPost(title, content, categoryIds);
  const data = await BlogPost.create({ userId: id, title, content, categoryIds })
    .then((post) => {
      post.addCategory(categoryIds);
      return ({ id: post.id, userId: post.userId, title: post.title, content: post.content });
    });
  return ({ status: httpStatus.CREATED, data });
};

const getAll = async () => {
  const data = await BlogPost.findAll({ include: 
    [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });

  return ({ status: httpStatus.OK, data });
};

const getById = async ({ id }) => {
  const data = await BlogPost.findAll({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });

  return ({ status: httpStatus.OK, data });
};

module.exports = { createPost, getAll, getById };
