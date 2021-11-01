const express = require('express');

const blogPostsController = require('../controllers/blogPostsController');
const JWTValidation = require('../middlewares/JWTValidation');
const postCheckUser = require('../middlewares/postCheckUser');
const errorMiddleware = require('../middlewares/error');

const route = express.Router();

route
  .post('/', JWTValidation, blogPostsController.createPost)
  .get('/:id', JWTValidation, blogPostsController.getPostById)
  .get('/', JWTValidation, blogPostsController.getAllPosts)
  .put('/:id', JWTValidation, postCheckUser, blogPostsController.updatePost)
  .delete('/:id', JWTValidation, postCheckUser, blogPostsController.deletePost);

route.use(errorMiddleware);

module.exports = route;