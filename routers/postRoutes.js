const express = require('express');

const validCreatePost = require('../middleware/validCreatePost');
const validateJWT = require('../auth/validateJWT');

const { createPost, getPost } = require('../controllers/postController');

const router = express.Router();

router.post('/', validateJWT, validCreatePost, createPost);

router.get('/', validateJWT, getPost);

module.exports = router;