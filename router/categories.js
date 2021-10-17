const express = require('express');
const { controllerCategoryCreate, controllerCategoryList } = require('../controller/categories');
const { tokenValidator, nameValidator } = require('../middlewares');

const router = express.Router();

router.post('/', tokenValidator, nameValidator, controllerCategoryCreate);
router.get('/', tokenValidator, controllerCategoryList);

module.exports = router;