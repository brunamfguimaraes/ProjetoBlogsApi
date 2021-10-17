const express = require('express');
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');
const jwtToken = require('../controllers/jwtToken');

const router = express.Router();

// ADD
router.post('/post', 
 postController.validTitle,
 postController.validContent,
 postController.validCategoryIds,
 categoryController.validCategory,
  jwtToken.validJWT,
  postController.createPost);

// GET
router.get('/post', 
  jwtToken.validJWT,
  postController.getPost);

module.exports = router;