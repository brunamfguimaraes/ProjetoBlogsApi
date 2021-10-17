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

module.exports = router;
