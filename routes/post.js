const express = require('express');
const { validateToken } = require('../services/userService');
const postService = require('../services/postService');
const postController = require('../controllers/postController');

const router = express.Router();

router.post(
  '/post',
  validateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.validateCategoryId,
  postService.validateCategories,
  postController.creatPost,
);

router.get(
    '/post',
    validateToken,
    postController.getPosts,
);

router.get(
    '/post/:id',
    validateToken,
    postController.getPostsById,
);

router.put(
  '/post/:id',
  validateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.editCategory,
  postService.validUser,
  postController.updatePost,
);

module.exports = router;