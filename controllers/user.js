const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();

const { SECRET } = process.env.SECRET;

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
    res.status(500).json({ e: 'Erro ao criar usuário' });
  }
};

const getUsers = async (_req, res) => {
  try {
    const result = await User.findAll();
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ e: 'Erro ao listar usuários' });
  }
};

module.exports = {
  createUser,
  getUsers,
}; 