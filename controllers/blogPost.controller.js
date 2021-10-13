const PostService = require('../services/blogPost.service');

const createPost = async (req, res) => {
  const { name } = req.body;

  const newPost = await PostService.createPost(name);
  return res.status(201).json(newPost);
};
/* const getAllCategories = async (_req, res) => {
  const allCategories = await PostService.getAllCategories();
  return res.status(200).json(allCategories);
}; */

module.exports = { createPost };
