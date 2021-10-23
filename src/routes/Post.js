const express = require('express');
const validateToken = require('../middleweres/validateToken');
// const { Token } = require('../middleweres/validateJWT');

const router = express.Router();

const { createPost, getAllPosts } = require('../controllers/Post');

router.route('/')
.get(validateToken, getAllPosts)
.post(validateToken, createPost);

module.exports = router;
