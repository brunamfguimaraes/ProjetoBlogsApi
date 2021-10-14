const router = require('express').Router();
const middlewares = require('../middlewares');
const { createPost, getPosts } = require('../controllers/postController');

router.post('/', middlewares.validateJWT, createPost);
router.get('/', middlewares.validateJWT, getPosts);
// getPostById
// router.get('/:id', getPostById);
// updatePost
// router.put('/:id', updatePost);
// removePost
// router.delete('/:id', removePost);
// searchPost

module.exports = router;