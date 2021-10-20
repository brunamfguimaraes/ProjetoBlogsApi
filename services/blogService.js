const { BlogPost, User, Category, PostsCategory } = require('../models');

console.log(PostsCategory);

const blogValidations = require('../validations/blogValidations');

const addPost = async (title, content, categoryIds, token) => {
  blogValidations.validTitle(title);
  blogValidations.validContent(content);
  await blogValidations.validCategoryId(categoryIds);
  const { data } = blogValidations.validToken(token);
  console.log(data, 'datassssssssssssssss');
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

const getPostById = async (token, id) => {
  blogValidations.validToken(token);
  await blogValidations.validPostExist(id);
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

const editPost = async (token, id) => {
  blogValidations.validToken(token);
  console.log(id);
};
const destroyPost = async (token, id) => {
  blogValidations.validToken(token);
  console.log(id);
};
const searchPost = async (token, q) => {
  blogValidations.validToken(token);
  console.log(q);
};

module.exports = {
  addPost,
  getPost,
  getPostById,
  editPost,
  destroyPost,
  searchPost,
};