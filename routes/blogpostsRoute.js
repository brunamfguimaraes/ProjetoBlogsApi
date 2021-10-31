const express = require('express');

const blogPostsController = require('../controllers/blogPostsController');

const route = express.Router();

route.post('/', blogPostsController.createPost);

module.exports = route;