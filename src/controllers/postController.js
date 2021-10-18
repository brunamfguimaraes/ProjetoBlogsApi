const { StatusCodes } = require('http-status-codes');
const postService = require('../services/postService');

const createPost = async (req, res) => {
  const token = req.headers.authorization;
  const post = await postService(req.body, token);

  return res.status(StatusCodes.CREATED).json(post);
};

module.exports = createPost;
