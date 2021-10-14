const express = require('express');
const validateJWT = require('../auth/validateJWT');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  removePost,
  searchPost } = require('../controllers/postController');

const router = express.Router();

router.route('/search')
    .get(
      validateJWT,
      searchPost,
    );

router.route('/')
  .post(
    validateJWT,
    createPost,
  )
  .get(
    validateJWT,
    getAllPosts,
  );

router.route('/:id')
  .get(
    validateJWT,
    getPostById,
  )
  .put(
    validateJWT,
    updatePost,
  )
  .delete(
    validateJWT,
    removePost,
  );

module.exports = router;