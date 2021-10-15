const express = require('express');
const { validateJWT } = require('../auth/validateToken');
const { createBlogPost, getAllBlogPosts } = require('../controllers/blogPostController');
const { validBlogPost, validCategoryIds } = require('../middlewares/blogPostValidations');

const router = express.Router();

router.route('/')
  .post(validateJWT, validBlogPost, validCategoryIds, createBlogPost)
  .get(validateJWT, getAllBlogPosts);

module.exports = router;