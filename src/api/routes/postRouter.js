const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  createPostByQuery,
} = require('../controllers/postController');
const {
  validatePostData,
  checkCategories,
} = require('../middlewares/validatePost');
const { verifyToken } = require('../middlewares/validateUser');

const router = express.Router();

router.route('/search').get(verifyToken, createPostByQuery);

router
  .route('/')
  .post(validatePostData, verifyToken, checkCategories, createPost)
  .get(verifyToken, getAllPosts);

router
  .route('/:id')
  .get(verifyToken, getPost)
  .put(verifyToken, validatePostData, updatePost)
  .delete(verifyToken, deletePost);

module.exports = router;
