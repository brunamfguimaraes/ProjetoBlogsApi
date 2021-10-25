const statusCode = require('http-status-codes');
const postService = require('../services/postService');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const createdPost = await postService.createPost({ title, content, userId, categoryIds });

  if (createdPost.message) {
      return res.status(statusCode.BAD_REQUEST).json({ message: createdPost.message });
  }

  return res.status(statusCode.CREATED).json(createdPost);
};

module.exports = {
  createPost,
};
