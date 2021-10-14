const express = require('express');
const { createPost, getAllPosts, getPostById } = require('../controllers/postController');
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

router.route('/:id')
  .get(
    valiteJWT,
    getPostById,
  );
  
module.exports = router;