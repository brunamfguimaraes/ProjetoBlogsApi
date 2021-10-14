const express = require('express');

const {
  createPost,
  verifyEmptyFields,
  checkCategories,
} = require('../controllers/postsController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, verifyEmptyFields, checkCategories, createPost);
router.get('/', validateJWT);

module.exports = router;
