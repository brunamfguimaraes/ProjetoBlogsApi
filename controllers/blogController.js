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

const getPostById = async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = req.params;
  const result = await blogService.getPostById(token, id);
  return res.status(200).json(result);
};

const editPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = req.params;
  const { title, content } = req.body;
  const result = await blogService.editPost(token, id, title, content);
  return res.status(200).json(result);
};

const destroyPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = req.params;
  await blogService.destroyPost(token, id);
  return res.status(204).end();
};

const searchPost = async (req, res) => {
  const { authorization: token } = req.headers;
  const { q } = req.query;
  const result = await blogService.searchPost(token, q);
  return res.status(200).json(result);
};

module.exports = {
  getPost,
  addPost,
  getPostById,
  editPost,
  destroyPost,
  searchPost,
};