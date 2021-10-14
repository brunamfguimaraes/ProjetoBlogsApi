const postService = require('../services/postService');
const { CREATED } = require('./msgStatus');

const createPost = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const blogPost = await postService.createPost(newPost, id);
  return res.status(CREATED).json(blogPost);
};

module.exports = {
  createPost,
};
