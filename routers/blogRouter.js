const express = require('express');
const rescue = require('express-rescue');

const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', rescue(blogController.addPost));
blogRouter.get('/', rescue(blogController.getPost));

module.exports = blogRouter;
