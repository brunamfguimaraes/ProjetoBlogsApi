const express = require('express');

const blogPostsController = require('../controllers/blogPostsController');
const JWTValidation = require('../middlewares/JWTValidation');
const postCheckUser = require('../middlewares/postCheckUser');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router
  .post('/', JWTValidation, blogPostsController.createPost)
  .get('/search', JWTValidation, blogPostsController.searchPosts)
  .get('/', JWTValidation, blogPostsController.getAllPosts)
  .get('/:id', JWTValidation, blogPostsController.getPostById)
  .put('/:id', JWTValidation, postCheckUser, blogPostsController.updatePost)
  .delete('/:id', JWTValidation, postCheckUser, blogPostsController.deletePost);

router.use(errorMiddleware);

module.exports = router;