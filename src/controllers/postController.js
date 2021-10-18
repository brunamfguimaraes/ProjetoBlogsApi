const { StatusCodes } = require('http-status-codes');
const postService = require('../services/postService');

const createPost = async (req, res) => {
  const token = req.headers.authorization;
  const post = await postService.create(req.body, token);

  return res.status(StatusCodes.CREATED).json(post);
};

const getPost = async (req, res) => {
  try {
    const posts = await postService.get();
    res.status(StatusCodes.OK).json(posts);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

module.exports = { createPost, getPost };
