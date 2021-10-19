const express = require('express');
const controller = require('../controllers/posts');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.addBlogPost);

router.get('/:id', validateJWT, controller.getBlogPostByID);

router.get('/', validateJWT, controller.getAllBlogPost);

module.exports = router;