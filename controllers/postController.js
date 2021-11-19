const service = require('../services/postService');

const createPost = async (req, res) => service.createPost(req.body, req.userInfo)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = async (_req, res) => service.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = async (req, res) => service.getById(req.params)
  .then(({ status, data }) => res.status(status).json(data));

const updateById = async (req, res) => service.updateById(req.params, req.body, req.userInfo)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
};
