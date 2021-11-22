const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../models');
const userService = require('../services/userService');

require('dotenv').config();

const SECRET = 'batatinhafrita123';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ email }, SECRET, jwtConfig);
    res.status(201).json(token);
  } catch (e) {
    res.status(500).json('Erro ao criar usuário');
  }
};

const getUsers = async (_req, res) => {
  try {
    const result = await userService.getUsers();

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao listar usuários' });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userService.getUsersById(id);

    if (!result) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Erro ao listar usuário pelo ID' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { id: userId } = await User.findOne({ where: { email } });

  const post = await BlogPost.findOne({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const result = await BlogPost.destroy({ where: { id } });
  return res.status(204).json(result);
};

const deleteUser = async (req, res) => {
  try {
    // const { id } = req.params;

    await userService.deleteUser(1);

    return res.status(204).json();
  } catch (e) {
    res.status(500).json({ e: 'Erro ao deletar User' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUsersById,
  deletePost,
  deleteUser,
};