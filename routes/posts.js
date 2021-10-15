const router = require('express').Router();
const middlewares = require('../middlewares');
const { 
  createPost,
  getPosts, 
  getPostById,
  updatePost,
  removePost,
} = require('../controllers/postController');

router.post('/', middlewares.validateJWT, createPost);
router.get('/', middlewares.validateJWT, getPosts);
router.get('/:id', middlewares.validateJWT, getPostById);
router.put('/:id', middlewares.validateJWT, updatePost);
router.delete('/:id', middlewares.validateJWT, removePost);
// searchPost

module.exports = router;