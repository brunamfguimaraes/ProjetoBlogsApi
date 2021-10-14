const express = require('express');

const {
  createPost,
  verifyEmptyFields,
  checkCategories,
  getAllPosts,
  getOnePost,
} = require('../controllers/postsController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, verifyEmptyFields, checkCategories, createPost);

router.get('/', validateJWT, getAllPosts);

router.get('/:id', validateJWT, getOnePost);

module.exports = router;
