const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  createPostByQuery,
} = require('../controllers/postController');
const { verifyToken } = require('../middlewares/validateUser');

const router = express.Router();

router.route('/search').get(verifyToken, createPostByQuery);

router.route('/').post(verifyToken, createPost).get(verifyToken, getAllPosts);

router
  .route('/:id')
  .get(verifyToken, getPost)
  .put(verifyToken, updatePost)
  .delete(verifyToken, deletePost);

module.exports = router;
