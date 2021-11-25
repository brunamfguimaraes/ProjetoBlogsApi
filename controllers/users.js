const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv/config');

// Importação funções de validação de usuário
const {
  validateDisplayName,
  validateEmail,
  validatePassword, 
} = require('../middlewares/validateNewUser');

// Importação validação do token
const validateToken = require('../middlewares/validateToken');

// HTTP status codes
const HTTP = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  NotFound: 404,
  Conflict: 409,
};

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const router = express.Router();

// Requisito 3
router.get('/', validateToken, async (_req, res) => {
  // Busca todos os usuários cadastrados no BD
  const users = await User.findAll();
  
  return res.status(HTTP.Ok).json(users);
});

// Requisito 4
router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  // Busca o usuário no BD pelo id
  const user = await User.findOne({ where: { id } });

  if (!user) return res.status(HTTP.NotFound).json({ message: 'User does not exist' });

  return res.status(HTTP.Ok).json(user);
});

// Requisito 1
router.post('/', validateDisplayName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  // Busca se esse usuário ja está cadastrado
  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(HTTP.Conflict).json({ message: 'User already registered' });

  // Cria o usuário no BD
  await User.create({ displayName, email, password, image });
  // Cria o token 
  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return res.status(HTTP.Created).json({ token });
});

// Requisito 12
router.delete('/me', validateToken, async (req, res) => {
  const { email } = req;
  // Exclui o usuário correspondente ao token 
  await User.destroy({ where: { email } });
  return res.send(HTTP.NoContent);
});

module.exports = router; 
