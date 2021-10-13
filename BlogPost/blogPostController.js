const rescue = require('express-rescue');
const service = require('./blogPostService');

const create = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { userId } = req;
  const newBlogPost = await service.create({ title, content, categoryIds, userId });
  res.status(201).json(newBlogPost);
});

const getAll = rescue(async (req, res) => {
  const blogPosts = await service.getAll();
  res.status(200).json(blogPosts);
});

module.exports = {
  create,
  getAll,
};
