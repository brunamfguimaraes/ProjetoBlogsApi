const statusCode = require('http-status-codes');
const postService = require('../services/postService');
const { User, Category, BlogPost } = require('../models');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const createdPost = await postService.createPost({ title, content, userId, categoryIds });

  if (createdPost.message) {
      return res.status(statusCode.BAD_REQUEST).json({ message: createdPost.message });
  }

  return res.status(statusCode.CREATED).json(createdPost);
};

const getAllPosts = async (req, res) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  console.log(posts);
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
};
