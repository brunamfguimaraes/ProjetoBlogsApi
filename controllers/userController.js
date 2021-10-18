const userServices = require('../services/userServices');

const addUser = async (req, res) => {
  const result = await userServices.addUser(req.body);
  return res.status(201).json(result);
};

const getUsers = async (req, res) => {
  const { authorization: token } = req.headers;
  const result = await userServices.getUsers(token);
  return res.status(200).json(result);
};

const getUserByid = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const result = await userServices.getUserByid(id, token);
  return res.status(200).json(result);
};

module.exports = {
  addUser,
  getUsers,
  getUserByid,
};