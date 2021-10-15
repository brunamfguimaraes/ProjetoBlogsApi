const express = require('express');
const postController = require('../controller/postController');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateToken, postController.createPost);

module.exports = router;