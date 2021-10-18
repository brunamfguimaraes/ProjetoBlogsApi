const jwt = require('jsonwebtoken');
const { BlogPost, User, Category, PostsCategory } = require('../models/index');
const { code, errorMessage } = require('../schema/index');

/**
 * 
 * @param {object} post title, content, categoryIds
 * return code, notification
 */
const createPost = async ({ title, content, categoryIds }, token) => {
  const secret = process.env.JWT_SECRET;
  const { email } = jwt.verify(token, secret);

  const categories = await Category.findAll({ where: { id: categoryIds } });

 if (categories.length !== categoryIds.length) {
   return {
     code: code.HTTP_BAD_REQUEST,
     notification: { message: errorMessage('noCategoryIds') },
   };
 }

  const { id } = await User.findOne({ where: { email } });
  const newPost = await BlogPost.create({
    title, content, userId: id, postsCategory: categoryIds }, { include: PostsCategory });

  const successfullyCreated = {
    code: code.HTTP_CREATED,
    notification: newPost,
  };

  return successfullyCreated;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  const allPosts = {
    code: code.HTTP_OK_STATUS,
    notification: posts,
  };

  return allPosts;
};

module.exports = {
  createPost,
  getPosts,
};
