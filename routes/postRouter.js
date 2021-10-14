const express = require('express');

const router = express.Router();

const postController = require('../controller/postController');

router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.get('/', postController.getAllPost);
router.put('/:id', postController.editPosts);

module.exports = router;