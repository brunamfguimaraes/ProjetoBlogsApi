const blogPostService = require('../services/blogPostService');

const createBlogPost = async (req, res) => {
  const { id: userId } = req.user;
  const { categoryIds, ...post } = req.body;
  const newPost = await blogPostService.createBlogPost({ ...post, userId }, categoryIds);
  return res.status(201).json(newPost);
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedPost = await blogPostService.updateBlogPost(id, req.body, userId);
  res.status(200).json(updatedPost);
};

const removeBlogPost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await blogPostService.removeBlogPost(id, userId);
  return res.status(204).json(result);
};

const getAllBlogPost = async (req, res) => {
  const posts = await blogPostService.getAllBlogPost();
  return res.status(200).json(posts);
};

const getBlogPostById = async (req, res) => {
  const post = await blogPostService.getBlogPostById(req.params.id);
  return res.status(200).json(post);
};

const getBlogPostBySearchTerm = async (req, res) => {
  const { q } = req.query;
  const result = await blogPostService.getBlogPostBySearchTerm(q);
  return res.status(200).json(result);
};

module.exports = {
  getBlogPostById,
  removeBlogPost,
  getBlogPostBySearchTerm,
  updateBlogPost,
  createBlogPost,
  getAllBlogPost,
};
