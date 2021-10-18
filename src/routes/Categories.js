const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createCategory, getAllCategories } = require('../controllers/Categories');

const router = express.Router();

router.route('/')
  .post(validateJWT, createCategory)
  .get(validateJWT, getAllCategories);

module.exports = router;