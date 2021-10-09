const express = require('express');
const { createPost } = require('../controllers/postController');
const {
  validatePostData,
  checkCategories,
} = require('../middlewares/validatePost');
const { verifyToken } = require('../middlewares/validateUser');

const router = express.Router();

router
  .route('/')
  .post(validatePostData, verifyToken, checkCategories, createPost);
// router.route('/').post(validateLogin, login);

module.exports = router;
