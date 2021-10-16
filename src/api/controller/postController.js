const express = require('express');

const validateToken = require('../middleware/validations/validationToken');
const validPost = require('../middleware/validations/validationPost');
const { getPostAll, getPostById, controllerAddNewPost } = require('../service/postService');

const appPost = express.Router();

appPost.post('/', validPost, validateToken, async (req, res, next) => {
  const { title, categoryIds, content } = req.body;
  const { userId } = req;
  const result = await controllerAddNewPost(userId, title, categoryIds, content);
  if (result.isError) {
    return next(result);
  }
  return res.status(201).json(result);
});

appPost.get('/', validateToken, async (_req, res) => {
  const resultAllPost = await getPostAll();
  return res.status(200).json(resultAllPost);
});

appPost.get('/:id', validateToken, async (req, res) => {
  console.log('req.params.id :', req.params.id);
  const resultByIdPost = await getPostById(req.params.id);
  return res.status(200).json(resultByIdPost);
});

module.exports = appPost;
