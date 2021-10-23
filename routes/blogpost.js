const express = require('express');
const { createPost, getPosts } = require('../controllers/BlogPost');

const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, createPost);
router.get('/', checkToken, getPosts);

module.exports = router;