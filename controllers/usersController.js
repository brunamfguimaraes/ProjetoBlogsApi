const userServices = require('../services/usersService');

const createUser = async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  if (newUser.err) return res.status(newUser.err.status).json(newUser.err.message);
  return res.status(newUser.resp.status).json(newUser.resp.content);
};

const loginUser = async (req, res) => {
  const authUser = await userServices.loginUser(req.body);
  if (authUser.err) return res.status(authUser.err.status).json(authUser.err.message);
  return res.status(authUser.resp.status).json(authUser.resp.content);
};

module.exports = {
  createUser,
  loginUser,
};