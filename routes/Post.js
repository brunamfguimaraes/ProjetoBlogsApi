const { Router } = require('express');
const PostController = require('../controllers/Post');
const { tokenValidation } = require('../mid/tokenValidation');

const Post = Router();

Post
    .get('/', tokenValidation, PostController.getAll);

module.exports = Post;
