const express = require('express');

const router = express.Router();
const controller = require('../controllers/postController');
const { checkToken, validateJWT } = require('../middlewares/jwtValidations');
const {
  validateTitle,
  validateContent,
  validateCategoryIds,
} = require('../middlewares/genericValidations');

router.post('/',
  validateTitle,
  validateContent,
  validateCategoryIds,
  checkToken,
  validateJWT,
  controller.createPost);

router.get('/', checkToken, validateJWT, controller.getPosts);

router.get('/:id', checkToken, validateJWT, controller.getPostById);

module.exports = router;
