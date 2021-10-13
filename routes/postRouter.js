const express = require('express');

const router = express.Router();

const postController = require('../controller/postController');

router.post('/', postController.createPost);
router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostById);

module.exports = router;