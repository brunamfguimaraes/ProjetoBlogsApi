const express = require('express');
const postControllers = require('../controllers/blogpostControllers');
const { validateJWT } = require('../middlewares/jwt');
const validateCategory = require('../middlewares/validateCategory');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();

router.post(
  '/',
  validateJWT,
  validateFields,
  validateCategory,
  postControllers.createPost,
);

module.exports = router;
