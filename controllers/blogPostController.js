const express = require('express');
const validateToken = require('../validations/validateJWT');

const router = express.Router();

const blogPost = require('../services/blogPostService');

router.post('/', validateToken, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const newPost = await blogPost.createBlogPost(title, content, categoryIds, id);
    
  if (newPost.message === '"categoryIds" not found') {
    return res.status(400).json(newPost);
  }

  if (typeof newPost.message === 'string') {
    return res.status(400).json(newPost);
  }

  res.status(201).json({
    id: newPost.id,
    userId: id,
    title: newPost.title,
    content: newPost.content,
  });
});

router.get('/', validateToken, async (_req, res) => {
  const findAll = await blogPost.findAllBlogPosts();

  return res.status(200).json(findAll);
});

module.exports = router;