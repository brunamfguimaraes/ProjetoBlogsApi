const express = require('express');

const router = express.Router();

const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
} = require('../controllers/blogPostController');
const jwtValidations = require('../middlewares/jwtValidations');
const { fieldValidations, categoryIdValidation } = require('../middlewares/blogPostValidations');
 
router.put('/:id', jwtValidations, fieldValidations, categoryIdValidation, updateBlogPost);
router.get('/:id', jwtValidations, getBlogPostById);
router.post('/', jwtValidations, categoryIdValidation, fieldValidations, createBlogPost);
router.get('/', jwtValidations, getAllBlogPosts);

module.exports = router;