const express = require('express');
const categoryController = require('../controller/categoryController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.post('/categories', jwtValidation, categoryController.createCategory);

module.exports = router;