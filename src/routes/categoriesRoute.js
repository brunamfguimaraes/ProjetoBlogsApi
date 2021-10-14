const express = require('express');

const { createCategory, getAllCategories } = require('../controllers/categoryController');
const valiteJWT = require('../auth/validateJWT');

const router = express.Router();

router.route('/')
  .post(
    valiteJWT,
    createCategory,
  )
  .get(
    valiteJWT,
    getAllCategories,
  );

module.exports = router;