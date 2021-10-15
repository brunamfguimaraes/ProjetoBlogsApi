const { 
  createUser: registerUser, 
  getAllUsers, 
  userById,
  deleteMe,
 } = require('../services/usersService');
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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userById(id);
    if (user.message) return res.status(user.statusCode).json({ message: user.message });
    
    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

const removeMe = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const removedUser = await deleteMe(token);
    return res.status(204).json(removedUser);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeMe,
};