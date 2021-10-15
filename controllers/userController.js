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
  console.log(users);
  res.status(200).json(users);
};

module.exports = {
  create,
  getAll,
};