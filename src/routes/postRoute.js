const express = require('express');
const valiteJWT = require('../auth/validateJWT');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost } = require('../controllers/postController');

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
  )
  .put(
    valiteJWT,
    updatePost,
  )
  .delete(
    valiteJWT,
    removePost,
  );

module.exports = router;