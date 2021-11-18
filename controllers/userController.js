const service = require('../services/userService');

const createUser = async (req, res) => service.createUser(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = {
  createUser,
};
