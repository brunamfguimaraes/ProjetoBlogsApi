const express = require('express');
const { createCategory } = require('../controllers/Category');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, createCategory);

module.exports = router; 