const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createBlogPost, getAllBlogPosts } = require('../controllers/BlogPosts');

const router = express.Router();

router.route('/')
  .post(validateJWT, createBlogPost)
  .get(validateJWT, getAllBlogPosts);

module.exports = router;