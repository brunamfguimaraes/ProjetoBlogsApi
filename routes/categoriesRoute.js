const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const JWTValidation = require('../middlewares/JWTValidation');
const errorMiddleware = require('../middlewares/error');

const router = express.Router();

router
  .post('/', JWTValidation, categoriesController.createCategory)
  .get('/', JWTValidation, categoriesController.getAllCategories);

router.use(errorMiddleware);

module.exports = router;