const express = require('express');
const PostController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

// router.get('/categories', validateJWT, CategoryController.getCategories);

router.post('/post', validateJWT, PostController.createPost);

module.exports = router;