const service = require('../services/BlogPost');

const create = async (req, res) => {
  const { id: userId } = req.user;
  const { categoryIds, ...post } = req.body;
  const newPost = await service.create({ ...post, userId }, categoryIds);
  return res.status(201).json(newPost);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedPost = await service.update(id, req.body, userId);
  res.status(200).json(updatedPost);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await service.remove(id, userId);
  return res.status(204).json(result);
};

const getAll = async (req, res) => {
  const posts = await service.getAll();
  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const post = await service.getById(req.params.id);
  return res.status(200).json(post);
};

const getBySearchTerm = async (req, res) => {
  const { q } = req.query;
  const result = await service.getBySearchTerm(q);
  return res.status(200).json(result);
};

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  getBySearchTerm,
};
