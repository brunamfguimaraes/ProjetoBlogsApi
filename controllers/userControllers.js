const JWT = require('jsonwebtoken');
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

const deleteUser = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = JWT.decode(token);
  const deletedPost = await userServices.deleteUser(id);
  if (deletedPost.message) return next(deletedPost);
  return res.status(204).end();
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  deleteUser,
};
