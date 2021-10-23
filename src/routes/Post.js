const express = require('express');

const router = express.Router();

const { getAllPosts, createPost } = require('../controllers/Post');

router.route('/')
.get(getAllPosts)
.post(createPost);

module.exports = router;
