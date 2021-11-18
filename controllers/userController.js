const service = require('../services/userService');

const create = async (req, res) => service.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  create,
};
