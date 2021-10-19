const express = require('express');
const { createCategory, getCategories } = require('../controllers/Category');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, createCategory);
router.get('/', checkToken, getCategories);

module.exports = router; 