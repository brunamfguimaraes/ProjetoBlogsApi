const express = require('express');
const { createPost } = require('../controllers/postController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(
    valiteJWT,
    createPost,
  );

module.exports = router;