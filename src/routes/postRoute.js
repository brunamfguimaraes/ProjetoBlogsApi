const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(
    valiteJWT,
    createPost,
  )
  .get(
    valiteJWT,
    getAllPosts,
  );

module.exports = router;