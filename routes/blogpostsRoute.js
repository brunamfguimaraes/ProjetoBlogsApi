const express = require('express');

const blogPostsController = require('../controllers/blogPostsController');
const JWTValidation = require('../middlewares/JWTValidation');

const route = express.Router();

route
  .post('/', JWTValidation, blogPostsController.createPost)
  .get('/:id', JWTValidation, blogPostsController.getPostById)
  .get('/', JWTValidation, blogPostsController.getAllPosts);

module.exports = route;