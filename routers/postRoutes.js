const express = require('express');

const validCreatePost = require('../middleware/validCreatePost');
const validateJWT = require('../auth/validateJWT');

const { createPost } = require('../controllers/postController');

const router = express.Router();

router.post('/', validateJWT, validCreatePost, createPost);

module.exports = router;