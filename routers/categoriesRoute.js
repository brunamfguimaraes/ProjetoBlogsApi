const express = require('express');

const router = express.Router();
const validateJWT = require('../middlewares/validateJWT');

const categoriesController = require('../controllers/categoriesController');

router.post('/',
    validateJWT,
    categoriesController.verifyCategoryName,
    categoriesController.createCategory);

router.get('/',
    validateJWT,
    categoriesController.getAllCategories);

module.exports = router;
