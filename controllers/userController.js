const userService = require('../services/userService');

const create = async (req, res) => {
  const result = await userService.validateUser(req.body);
  if (result) { 
    return res.status(result.code).json({ message: result.message }); 
  }
  const token = await userService.createUser(req.body);
  return res.status(201).json({ token });
};

module.exports = {
  create,
};