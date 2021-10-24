const router = require('express').Router();

const CategoryController = require('../controllers/categoryController');
const nameValidator = require('../middlewares/categoryValidator');
const { tokenValidator } = require('../middlewares/tokenValidator');

router.post('/', nameValidator, tokenValidator, CategoryController.createCategory);

module.exports = router;
