const { Router } = require('express');
const PostController = require('../controllers/Post');
const { tokenValidation } = require('../mid/tokenValidation');

const Post = Router();

Post
    .get('/', tokenValidation, PostController.getAll)
    .delete('/:id', tokenValidation, PostController.postRemove);

module.exports = Post;
