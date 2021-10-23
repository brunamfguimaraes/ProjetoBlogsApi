const express = require('express');
const validateToken = require('../middleweres/validateToken');

const router = express.Router();

const { getAllPosts, createPost } = require('../controllers/Post');

router.route('/')
.get(validateToken, getAllPosts)
.post(createPost);

module.exports = router;
