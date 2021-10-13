const router = require('express').Router();
const middlewares = require('../middlewares');
const { createCategory } = require('../controllers/categoriesController');

router.post('/', middlewares.validateJWT, createCategory);
// router.get('/', getCategories);

module.exports = router;