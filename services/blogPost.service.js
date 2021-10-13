const { Post } = require('../models');
const PostValidation = require('../schemas/blogPost.validation');

const createPost = async (name) => {
  PostValidation.verifyPostName(name);

  try {
    const newPost = await Post.create({ name });
    return newPost;
  } catch (error) {
    return error;
  }
};

const getAllCategories = async () => {
  try {
    const allCategories = await Post.findAll({});
    return allCategories;
  } catch (error) {
    return error;
  }
};

module.exports = { createPost, getAllCategories };
