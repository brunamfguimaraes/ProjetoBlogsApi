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

module.exports = {
  createUser,
};