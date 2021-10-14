const express = require('express');
const controllers = require('../controllers');
const { validateToken, validateBlogPostContent } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, validateBlogPostContent, controllers.postController);
router.get('/', validateToken, controllers.getPostsController);

module.exports = router;
