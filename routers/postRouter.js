const express = require('express');
const postController = require('../controllers/postController');
const jwtToken = require('../controllers/jwtToken');

const router = express.Router();

// ADD
router.post('/post', 
 postController.validTitle,
 postController.validContent,
 postController.validCategoryIds,
  jwtToken.validJWT,
  postController.createPost);

module.exports = router;