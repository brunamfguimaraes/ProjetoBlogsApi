const express = require('express');
const rescue = require('express-rescue');

const blogController = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.post('/', rescue(blogController.addPost));

blogRouter.get('/', rescue(blogController.getPost));
blogRouter.get('/search', rescue(blogController.searchPost));
blogRouter.get('/:id', rescue(blogController.getPostById));

blogRouter.put('/:id', rescue(blogController.editPost));

blogRouter.delete('/:id', rescue(blogController.destroyPost));

module.exports = blogRouter;
