const express = require('express');
const { createCategory } = require('../controllers/categoryController');
const { validCategory } = require('../middlewares/categoryValidations');
const { validateJWT } = require('../auth/validateToken');

const router = express.Router();

router.route('/')
  .post(validateJWT, validCategory, createCategory);

module.exports = router;