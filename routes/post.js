const express = require('express');
const { postController, authMiddleware, postMiddleware } = require('../config');

const postRoute = express.Router();

postRoute.use(authMiddleware.checkCredentials);

postRoute.post('/', postMiddleware.validatePost, postController.createPost);
postRoute.get('/', postController.listAllPosts);
postRoute.get('/:id', postController.findById);
postRoute.put('/:id', postController.updatePost);

module.exports = postRoute;