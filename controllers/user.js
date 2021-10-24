const JWT = require('jsonwebtoken');
const services = require('../services/user');

const secret = 'tigre';

async function generateToken(body) {
  const { displayName, email } = body;
  const jwtconfig = {
    expiresIn: '20min',
    algorithm: 'HS256',
  };

  const token = JWT.sign({ displayName, email }, secret, jwtconfig);
  return token;
}

async function createUser(req, res) {  
  await services.createUser(req.body);
  const token = await generateToken(req.body);
  return res.status(201).json({ token });
}

async function getUser(req, res) {
  const user = await services.getUser();
  return res.status(200).json(user);
}

async function getUserById(req, res) {
  const user = await services.getUserById(req.params.id);
  return res.status(200).json(user);  
}

async function deleteUser(req, res) {
  const { user } = req;
  await services.deleteUser(user);
  return res.status(204).end();
}

module.exports = {
  createUser,
  generateToken,
  getUser,
  getUserById,
  deleteUser,
};