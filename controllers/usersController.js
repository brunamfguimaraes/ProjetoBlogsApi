const { createUser: registerUser } = require('../services/usersService');
const middlewares = require('../middlewares');

const createUser = async (req, res, next) => {
  const { error } = middlewares.validation(req.body);
  
  if (error) return next(error);

  const token = await registerUser(req.body);
  if (token.message) return res.status(token.statusCode).json({ message: token.message });
  
  return res.status(201).json(token);
};

module.exports = {
  createUser,
};