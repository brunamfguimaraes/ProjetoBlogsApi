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
  
  if (getAll === 'tokenNotFound') {
    return res.status(401).json({ message: 'Token not found' });
  }

  if (getAll === 'invalidToken') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return res.status(200).json(getAll);
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};