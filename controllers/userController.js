const express = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/userService');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
};

const router = express.Router();

const validateToken = (token) => {
  if (token === undefined || token === '') {
    return { err: { message: 'Token not found' }, status: 401 };
  }
  try {
    jwt.verify(token, secret);
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Expired or invalid token' }, status: 401 };
  }
  return {};
};

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const result = await service.postNewUser(displayName, email, password, image);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json(err);
  }
  const token = jwt.sign({ data: result }, secret, jwtConfig);
  res.status(201).json({ token });
});

router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  const tokenValidation = validateToken(authorization);
  if (tokenValidation.err) {
    const { err, status } = tokenValidation;
    return res.status(status).json(err);
  }
  const result = await service.listAllUsers();
  res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const tokenValidation = validateToken(authorization);
  if (tokenValidation.err) {
    const { err, status } = tokenValidation;
    return res.status(status).json(err);
  }
  const result = await service.getUserById(id);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json(err);
  }
  res.status(200).json(result);
});

module.exports = router;