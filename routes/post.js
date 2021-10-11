const express = require('express');
const { postController, authMiddleware, postMiddleware } = require('../config');

const postRoute = express.Router();

postRoute.use(authMiddleware.checkCredentials);

postRoute.post('/', postMiddleware.validatePost, postController.createPost);

module.exports = postRoute;