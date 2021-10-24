const postsServices = require('../services/postsService');

const createPost = async (req, res) => {
  const newPost = await postsServices.createPost(req.body, req.user);
  if (newPost.err) return res.status(newPost.err.status).json(newPost.err.message);
  return res.status(newPost.resp.status).json(newPost.resp.content);
};

const getAll = async (req, res) => {
  const allPosts = await postsServices.getAllPosts();
  if (allPosts.err) return res.status(allPosts.err.status).json(allPosts.err.message);
  return res.status(allPosts.resp.status).json(allPosts.resp.content);
};

module.exports = {
  createPost,
  getAll,
};