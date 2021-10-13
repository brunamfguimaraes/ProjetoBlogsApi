const express = require('express');

const { createCategory } = require('../controllers/categoryController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(
    valiteJWT,
    createCategory,
  );

module.exports = router;