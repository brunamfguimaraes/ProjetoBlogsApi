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

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const findByid = await blogPost.findById(id);
  
  if (typeof findByid.message === 'string') return res.status(404).json(findByid);

  return res.status(200).json(findByid);
});

router.get('/', validateToken, async (_req, res) => {
  const findAll = await blogPost.findAllBlogPosts();

  return res.status(200).json(findAll);
});

router.put('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const userId = req.user;
  const updateBlogPost = await blogPost.updatePost(id, data, userId.id);

  if (updateBlogPost.message === 'Unauthorized user') {
    return res.status(401).json(updateBlogPost);
  }

  if (typeof updateBlogPost.message === 'string') {
    return res.status(400).json(updateBlogPost);
  }

  return res.status(200).json(updateBlogPost);
});

module.exports = router;