const express = require('express');
const jwt = require('jsonwebtoken');
const service = require('../services/postService');

const secret = process.env.JWT_SECRET;

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

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const tokenValidation = validateToken(authorization);
  if (tokenValidation.err) {
    const { err, status } = tokenValidation;
    return res.status(status).json(err);
  }
  const result = await service.createPost(title, content, categoryIds, authorization);
  if (result.err) {
    const { err, status } = result;
    return res.status(status).json(err);
  }
  res.status(201).json(result);
});

router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  const tokenValidation = validateToken(authorization);
  if (tokenValidation.err) {
    const { err, status } = tokenValidation;
    return res.status(status).json(err);
  }
  const result = await service.getAllPosts();
  if (result.err) {
    const { err, status } = result;
    return res.status(status).json(err);
  }
  res.status(200).json(result);
});

module.exports = router;