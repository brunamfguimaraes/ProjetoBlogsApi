const express = require('express');
const PostController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/post/:id', validateJWT, PostController.getPostsById);
router.get('/post', validateJWT, PostController.getPosts);

router.post('/post', validateJWT, PostController.createPost);

router.put('/post/:id', validateJWT, PostController.updatePost);

module.exports = router;