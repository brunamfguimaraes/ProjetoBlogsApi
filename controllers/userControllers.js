const userServices = require('../services/userServices');
const { User } = require('../models');

const createUser = async (req, res, next) => {
  const newUser = await userServices.createUser(req.body);
  if (newUser.message) return next(newUser);
  return res.status(201).json({ token: newUser });
};

const login = async (req, res, next) => {
  const user = await userServices.login(req.body);
  if (user.message) return next(user);
  return res.status(200).json({ token: user });
};

const getUsers = async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne(
    {
      where: { id },
      attributes: { exclude: ['password'] },
    },
  );
  if (!user) return next({ message: 'User does not exist' });
  return res.status(200).json(user);
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
};
