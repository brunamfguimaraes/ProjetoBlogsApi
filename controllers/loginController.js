const service = require('../services/loginService');

const login = (req, res) => service.login(req.body)
  .then(({ status, token }) => res.status(status).json({ token }));

module.exports = { login };
