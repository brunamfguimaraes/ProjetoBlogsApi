const { StatusCodes } = require('http-status-codes');
const PostService = require('../services/postService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const newPost = await PostService.createPostTransaction({ title, content, userId, categoryIds });

  if (newPost.Error) return res.status(newPost.code).json({ message: newPost.message });

  res.status(StatusCodes.CREATED).json(newPost);
};

const getAll = async (req, res) => {
  const allPosts = await PostService.getAll();
  res.status(StatusCodes.OK).json(allPosts);
};

module.exports = {
  create,
  getAll,
};
