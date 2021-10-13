const express = require('express');

const { create, getAllPosts } = require('../../controllers/postController');

const validateToken = require('../../middlewares/validateToken');

 const { 
   validateTitle,
   validateContent,
   validateContegoryIds,
  } = require('../../middlewares/postMiddleware');

const router = express.Router();

router.post('/', 
  validateToken,
  validateTitle,
  validateContent,
  validateContegoryIds,
  create);

router.get('/', validateToken, getAllPosts);

module.exports = router;