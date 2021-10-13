const usersService = require('../service/usersService');

const createUser = async (req, res) => {
  const { body } = req;

  const user = await usersService.createUser(body);

  if (user.details) {
    return res.status(400).json({ message: user.details[0].message });
  }

  if (user === 'emailExists') {
    return res.status(409).json({ message: 'User already registered' });
  }

  return res.status(201).json({ token: user });
};

const loginUser = async (req, res) => {
  const { body } = req;

  const login = await usersService.loginUser(body);

  if (login.details) {
    return res.status(400).json({ message: login.details[0].message });
  }

  if (login === 'invalidData') {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({ token: login });
};

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization;

  const getAll = await usersService.getAllUsers(token);

  if (getAll.validToken) {
    return res.status(401).json(getAll.message);
  }

  return res.status(200).json(getAll);
};

const getUserById = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  
  const getById = await usersService.getUserById(token, id);
  
  if (!getById) {
    return res.status(404).json({ message: 'User does not exist' });
  }
  
  if (getById.validToken) {
    return res.status(401).json(getById.message);
  }
  
  return res.status(200).json(getById);
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
};