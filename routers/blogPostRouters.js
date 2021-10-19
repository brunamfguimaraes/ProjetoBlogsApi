const express = require('express');

const router = express.Router();

const { createBlogPost, getAllBlogPosts } = require('../controllers/blogPostController');
const jwtValidations = require('../middlewares/jwtValidations');
const { fieldValidations } = require('../middlewares/blogPostValidations');
 
router.post('/', jwtValidations, fieldValidations, createBlogPost);
router.get('/', jwtValidations, getAllBlogPosts);

module.exports = router;