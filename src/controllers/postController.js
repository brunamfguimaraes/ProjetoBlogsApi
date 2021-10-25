const { StatusCodes } = require('http-status-codes');
const PostService = require('../services/postService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  console.log('CONTROLLER: ', userId);
  const newPost = await PostService.createPostTransaction({ title, content, userId, categoryIds });
  res.status(StatusCodes.CREATED).json(newPost);
};

module.exports = {
  create,
};
