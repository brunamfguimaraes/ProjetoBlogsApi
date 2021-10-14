const userServices = require('../services/usersService');

const createUser = async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  if (newUser.err) return res.status(newUser.err.status).json(newUser.err.message);
  return res.status(newUser.resp.status).json(newUser.resp.content);
};

module.exports = {
  createUser,
};