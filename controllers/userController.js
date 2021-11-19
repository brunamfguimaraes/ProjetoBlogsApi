const service = require('../services/userService');

const createUser = async (req, res) => service.createUser(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

const getAll = async (_req, res) => service.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = async (req, res) => service.getById(req.params)
  .then(({ status, data }) => res.status(status).json(data));

const deleteById = async (req, res) => service.deleteById(req.userInfo)
  .then(({ status }) => res.status(status).json());

module.exports = {
  createUser,
  getAll,
  getById,
  deleteById,
};
