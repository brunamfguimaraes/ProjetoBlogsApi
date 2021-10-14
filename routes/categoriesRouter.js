const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const { validToken } = require('../api/auth/validToken');
const { validCategory } = require('../middlewares/categoriesValidations');

const router = express.Router();

router.route('/')
.post(validCategory, validToken, categoriesController.add);

module.exports = router;