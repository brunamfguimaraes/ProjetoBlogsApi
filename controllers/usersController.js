const { createUser: registerUser, getAllUsers } = require('../services/usersService');
const middlewares = require('../middlewares');

const createUser = async (req, res, next) => {
  const { error } = middlewares.validationUser(req.body);
  if (error) return next(error);

  const token = await registerUser(req.body);
  if (token.message) return res.status(token.statusCode).json({ message: token.message });
  
  return res.status(201).json(token);
};

const getUsers = async (_req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createUser,
  getUsers,
};