const router = require('express').Router();
const middlewares = require('../middlewares');
const { createCategory, getCategories } = require('../controllers/categoriesController');

router.post('/', middlewares.validateJWT, createCategory);
router.get('/', middlewares.validateJWT, getCategories);

module.exports = router;