const express = require('express');
const validateToken = require('../middleweres/validateToken');

const router = express.Router();

const { createCategories } = require('../controllers/Categories');

router.route('/')
.post(validateToken, createCategories);

module.exports = router;
