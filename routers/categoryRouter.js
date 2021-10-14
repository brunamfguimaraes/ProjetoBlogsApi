const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const { validCategory } = require('../middlewares/categoryValidations');
const { validateJWT } = require('../auth/validateToken');

const router = express.Router();

router.route('/')
  .post(validateJWT, validCategory, createCategory)
  .get(validateJWT, getAllCategories);

module.exports = router;