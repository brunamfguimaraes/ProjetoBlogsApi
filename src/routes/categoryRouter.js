const express = require('express');
const validateCategory = require('../middlewares/validations/category');
const { validateJWT } = require('../middlewares/tokenJWT');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateJWT, validateCategory, categoryController);

module.exports = router;