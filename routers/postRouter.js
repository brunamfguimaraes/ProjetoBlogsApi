const express = require('express');
const controllers = require('../controllers');
const { validateToken, validateBlogPostContent } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validateBlogPostContent, controllers.postController);

module.exports = router;
