const express = require('express');
const CategoryController = require('../controllers/categoryController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

// router.get('/categories', validateJWT, CategoryController.getCategory);

router.post('/categories', validateJWT, CategoryController.createCategory);

module.exports = router;