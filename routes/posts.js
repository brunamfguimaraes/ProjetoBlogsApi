const router = require('express').Router();
const middlewares = require('../middlewares');
const { createPost } = require('../controllers/postController');

router.post('/', middlewares.validateJWT, createPost);

// getPosts
// router.get('/post', getPosts);
// getPostById
// router.get('/post/:id', getPostById);
// updatePost
// router.put('/post/:id', updatePost);
// removePost
// router.delete('/post/:id', removePost);
// searchPost

module.exports = router;