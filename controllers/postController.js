const service = require('../services/postService');

const createPost = async (req, res) => service.createPost(req.body, req.userInfo)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = async (_req, res) => service.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = async (req, res) => service.getById(req.params)
  .then(({ status, data }) => res.status(status).json(data));

const updateById = async (req, res) => service.updateById(req.params, req.body, req.userInfo)
  .then(({ status, data }) => res.status(status).json(data));

const deleteById = async (req, res) => service.deleteById(req.params, req.userInfo)
  .then(({ status }) => res.status(status).json());

module.exports = {
  createPost,
  getAll,
  getById,
  updateById,
  deleteById,
};
