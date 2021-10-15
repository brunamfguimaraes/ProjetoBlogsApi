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

const getAll = async (req, res) => {
  const all = await userServices.getAllUsers();
  if (all.err) return res.status(all.err.status).json(all.err.message);
  return res.status(all.resp.status).json(all.resp.content);
};

const getById = async (req, res) => {
  const user = await userServices.getUserById(req.params);
  if (user.err) return res.status(user.err.status).json(user.err.message);
  return res.status(user.resp.status).json(user.resp.content);
};

module.exports = {
  createUser,
  loginUser,
  getAll,
  getById,
};