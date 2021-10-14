const express = require('express');

const {
  createPost,
  verifyEmptyFields,
  checkCategories,
  getAllPosts,
  getOnePost,
  updatePost,
  verifyEmptyField,
  validateUser,
  deletePost,
} = require('../controllers/postsController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, verifyEmptyFields, checkCategories, createPost);

router.get('/', validateJWT, getAllPosts);

router.get('/:id', validateJWT, getOnePost);

router.put('/:id', validateJWT, verifyEmptyField, validateUser, updatePost);

router.delete('/:id', validateJWT, validateUser, deletePost);

module.exports = router;
