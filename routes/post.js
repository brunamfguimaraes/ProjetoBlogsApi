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
  postController.creatPost,
);

router.get(
    '/post',
    validateToken.validateToken,
    postController.getPosts,
);

router.get(
    '/post/:id',
    validateToken.validateToken,
    postController.getPostsById,
);

router.put(
  '/post/:id',
  validateToken.validateToken,
  postService.validateTitle,
  postService.validateContent,
  postService.editCategories,
  postService.validUser,
  postController.updatePost,
);

router.delete(
  '/post/:id',
  validateToken.validateToken,
  postController.deletePost,
);

module.exports = router;