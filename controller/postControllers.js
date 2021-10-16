// const rescue = require('express-rescue');
const postService = require('../services/postService');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;
  const result = await postService.createBlogPost(title, content, categoryIds, userId);
  if (result.message) return res.status(result.status).json({ message: result.message });
  res.status(201).json(result);
};
const getAllBlogPost = async (_req, res) => {
  const result = await postService.getAllBlogPost();
  res.status(200).json(result);
};

module.exports = { 
  createBlogPost,
  getAllBlogPost,
 };