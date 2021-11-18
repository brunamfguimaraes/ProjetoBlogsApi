const express = require('express');
const categoryController = require('../controllers/categoryController');
const categoryService = require('../services/categoryService');
const tokenValidation = require('../services/userService');

const router = express.Router();

router.post(
    '/categories',
    tokenValidation.validateToken,
    categoryService.nameValidation,
    categoryController.createCategory,
);

router.get(
    '/categories',
    tokenValidation.validateToken,
    categoryController.getCategory,
);

module.exports = router;