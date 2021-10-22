const { Router } = require('express');
const PostController = require('../controllers/Post');
const { tokenValidation } = require('../mid/tokenValidation');

const Post = Router();

Post
    .get('/', tokenValidation, PostController.getAll);
Post
    .delete('/:id', tokenValidation, PostController.postRemove);
Post
    .get('/search?:searchTerm', tokenValidation, PostController.findPost);

module.exports = Post;
