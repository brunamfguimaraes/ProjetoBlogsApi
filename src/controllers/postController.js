const postService = require('../services/postService');
const { CREATED, OK } = require('./msgStatus');

const createPost = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const blogPost = await postService.createPost(newPost, id);
  return res.status(CREATED).json(blogPost);
};

const getPosts = async (_req, res) => {
  const blogPosts = await postService.getPosts();
  return res.status(OK).json(blogPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const blogPost = await postService.getPostById(id);
  return res.status(OK).json(blogPost);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
};
