const service = require('../services/BlogPost');

const create = async (req, res) => {
  const { id: userId } = req.user;
  const { categoryIds, ...post } = req.body;
  const newPost = await service.create({ ...post, userId }, categoryIds);
  return res.status(201).json(newPost);
};

const getAll = async (req, res) => {
  const posts = await service.getAll();
  return res.status(200).json(posts);
};

const getById = async (req, res) => {
  const post = await service.getById(req.params.id);
  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};
