const router = require('express').Router();
const middlewares = require('../middlewares');
const { 
  createPost,
  getPosts, 
  getPostById,
  updatePost,
  removePost,
  searchPost,
} = require('../controllers/postController');

router.post('/', middlewares.validateJWT, createPost);
router.get('/', middlewares.validateJWT, getPosts);
router.get('/search', middlewares.validateJWT, searchPost);
router.get('/:id', middlewares.validateJWT, getPostById);
router.put('/:id', middlewares.validateJWT, updatePost);
router.delete('/:id', middlewares.validateJWT, removePost);

module.exports = router;