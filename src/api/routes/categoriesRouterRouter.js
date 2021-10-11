const express = require('express');
const {
  createCategory,
  getCategories,
} = require('../controllers/categorieController');
const { verifyToken } = require('../middlewares/validateUser');

const router = express.Router();

router
  .route('/')
  .post(verifyToken, createCategory)
  .get(verifyToken, getCategories);

module.exports = router;
