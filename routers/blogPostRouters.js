const express = require('express');

const router = express.Router();

const { createBlogPost } = require('../controllers/blogPostController');
const jwtValidations = require('../middlewares/jwtValidations');
const { fieldValidations } = require('../middlewares/blogPostValidations');
 
router.post('/', jwtValidations, fieldValidations, createBlogPost);

module.exports = router;