const blogService = require('../services/blogService');

const addPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization: token } = req.headers;
  const result = await blogService.addPost(title, content, categoryIds, token);
  return res.status(201).json(result);
};

const getPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const result = await blogService.getPost(token);
  return res.status(200).json(result);
};

module.exports = {
  getPost,
  addPost,
};