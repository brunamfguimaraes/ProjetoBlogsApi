const express = require('express');

const blogPostsController = require('../controllers/blogPostsController');
const JWTValidation = require('../middlewares/JWTValidation');
const verifyUser = require('../middlewares/verifyUser');

const route = express.Router();

route
  .post('/', JWTValidation, blogPostsController.createPost)
  .get('/:id', JWTValidation, blogPostsController.getPostById)
  .get('/', JWTValidation, blogPostsController.getAllPosts)
  .put('/:id', JWTValidation, verifyUser, blogPostsController.updatePost);

module.exports = route;