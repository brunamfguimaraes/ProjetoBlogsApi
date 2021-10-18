const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const { createCategory } = require('../controllers/Categories');

const router = express.Router();

router.route('/')
  .post(validateJWT, createCategory);

module.exports = router;