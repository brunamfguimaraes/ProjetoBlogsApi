const express = require('express');

const router = express.Router();

const { createBlogPost } = require('../controllers/blogPostController');

const jwtValidations = require('../middlewares/jwtValidations');
 
router.post('/', jwtValidations, createBlogPost);

module.exports = router;