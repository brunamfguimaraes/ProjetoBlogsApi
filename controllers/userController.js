const userService = require('../services/userService');

const create = async (req, res) => {
  const result = await userService.createUser(req.body);
  if (result.code) { 
    return res.status(result.code).json({ message: result.message }); 
  }

  return res.status(201).json({ token: result });
};

module.exports = {
  create,
};