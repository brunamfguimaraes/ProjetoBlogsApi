const userService = require('../services/userService');

const create = async (req, res) => {
  const result = await userService.createUser(req.body);
  if (result.code) { 
    return res.status(result.code).json({ message: result.message }); 
  }

  return res.status(201).json({ token: result });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.findById(id);
  if (result.code) { return res.status(result.code).json({ message: result.message }); }
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
};