const router = require('express').Router();
const middlewares = require('../middlewares');
const { 
  createPost,
  getPosts, 
  getPostById,
} = require('../controllers/postController');

router.post('/', middlewares.validateJWT, createPost);
router.get('/', middlewares.validateJWT, getPosts);
router.get('/:id', middlewares.validateJWT, getPostById);
// updatePost
// router.put('/:id', updatePost);
// removePost
// router.delete('/:id', removePost);
// searchPost

module.exports = router;