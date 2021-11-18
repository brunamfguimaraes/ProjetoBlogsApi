const service = require('../services/userService');

const createUser = async (req, res) => service.createUser(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

const getAll = async (_req, res) => service.getAll()
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  createUser,
  getAll,
};
