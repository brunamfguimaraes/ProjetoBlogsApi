const express = require('express');
const validateToken = require('../middleweres/validateToken');

const router = express.Router();

const {
  createCategories,
  getAllCategories,
  getCategoriesById,
  updateCategory,
  deleteCategory,
} = require('../controllers/Categories');

router.route('/')
.get(validateToken, getAllCategories)
.post(validateToken, createCategories);

router.route('/:id')
.get(validateToken, getCategoriesById)
.put(validateToken, updateCategory)
.delete(validateToken, deleteCategory);

module.exports = router;
