const express = require('express');
const JWTValidator = require('../validators/JWTValidator');
const {
  newPost,
  getPosts,
  getPost,
  changePost,
  deletePost } = require('../controllers/PostController');

const router = express.Router();

router.route('/')
  .post(JWTValidator, newPost)
  .get(JWTValidator, getPosts);

router.route('/:id')
  .get(JWTValidator, getPost)
  .put(JWTValidator, changePost)
  .delete(JWTValidator, deletePost);

module.exports = router;
