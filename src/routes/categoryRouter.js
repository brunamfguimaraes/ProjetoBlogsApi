const express = require('express');
const validateCategory = require('../middlewares/validations/category');
const { validateJWT } = require('../middlewares/tokenJWT');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateJWT, validateCategory, categoryController.postCategory);
router.get('/', validateJWT, categoryController.getAll);

module.exports = router;
