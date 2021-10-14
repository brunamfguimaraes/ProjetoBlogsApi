const express = require('express');

const { create, getAllPosts, getPostByID } = require('../../controllers/postController');

const validateToken = require('../../middlewares/validateToken');

 const { 
   validateTitle,
   validateContent,
   validateContegoryIds,
   validateExistPost,
  } = require('../../middlewares/postMiddleware');

const router = express.Router();

router.post('/', 
  validateToken,
  validateTitle,
  validateContent,
  validateContegoryIds,
  create);

router.get('/', 
  validateToken, 
  getAllPosts);
  
router.get('/:id',
  validateToken, 
  validateExistPost,
  getPostByID);

module.exports = router;