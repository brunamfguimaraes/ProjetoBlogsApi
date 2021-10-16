const express = require('express');
const service = require('../services/postService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const result = await service.createPost(title, content, categoryIds, authorization);
  if (result.err) {
    const { err, status } = result;
    return res.status(status).json(err);
  }
  res.status(201).json(result);
});

module.exports = router;