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
  const data = await BlogPost.findOne({ where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }] });

  validate.blogExistById(data);

  return ({ status: httpStatus.OK, data });
};

const updateById = async ({ id }, body, userInfo) => {
  await validate.updatePost(id, body, userInfo);

  await BlogPost.update(body, { where: { id } });

  const data = await BlogPost.findOne({ where: { id },
    include:
    [{ model: Category, as: 'categories', through: { attributes: [] } }] });

  return ({ status: httpStatus.OK, data });
};

const deleteById = async ({ id }, userInfo) => {
  await validate.deletePost(id, userInfo);
  await BlogPost.destroy({ where: { id } });
  return ({ status: httpStatus.NO_CONTENT });
};

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  deleteById,
};
