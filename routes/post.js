const express = require('express');
const validateToken = require('../services/userService');
const postService = require('../services/postService');
const postController = require('../controllers/postController');

const router = express.Router();

router.post(
  '/post',
  validateToken.validateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.validateCategoryId,
  postService.validateCategories,
  postController.createPost,
);

router.get(
    '/post',
    validateToken.validateToken,
    postController.getPosts,
);

router.get(
    '/get/:id',
    validateToken.validateToken,
    postController.getPostsById,
)

module.exports = router;