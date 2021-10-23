const express = require('express');

const router = express.Router();

const validateToken = require('../middleweres/validateToken');

const {
  createPost,
} = require('../controllers/blogPost');

router.route('/')
.post(validateToken, createPost);

module.exports = router;
