const { BlogPost, User, Category } = require('../models');

const blogValidations = require('../validations/blogValidations');

const addPost = async (title, content, categoryIds, token) => {
  blogValidations.validTitle(title);
  blogValidations.validContent(content);
  await blogValidations.validCategoryId(categoryIds);
  const { data } = blogValidations.validToken(token);
  const createPost = await BlogPost.create({
    userId: data.id,
    title,
    content,
  });
  return createPost.dataValues;
};

const getPost = async (token) => {
  blogValidations.validToken(token);
  const postId = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: { through: [] } },
    ],
  });
  return postId;
};

module.exports = {
  addPost,
  getPost,
};