const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createBlogPost } = require('../controllers/BlogPosts');

const router = express.Router();

router.route('/')
  .post(validateJWT, createBlogPost);

module.exports = router;