const { Router } = require('express');
const BlogsController = require('../controllers/Blogs');
const { tokenValidation } = require('../mid/tokenValidation');

const Blog = Router();

Blog
    .get('/', tokenValidation, BlogsController.getAll)
    .delete('/:id', tokenValidation, BlogsController.postRemove);

module.exports = Blog;
