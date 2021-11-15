const express = require('express');
const { newPost } = require('../controllers/PostController');
const JWTValidator = require('../validators/JWTValidator');

const router = express.Router();

router.route('/')
  .post(
    JWTValidator,
    newPost,
  );

module.exports = router;
