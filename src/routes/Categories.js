const express = require('express');
const validateToken = require('../middleweres/validateToken');

const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require('../controllers/Categories');

router.route('/')
.get(validateToken, getAllCategories)
.post(validateToken, createCategory);

router.route('/:id')
.get(validateToken, getCategoryById);

module.exports = router;
