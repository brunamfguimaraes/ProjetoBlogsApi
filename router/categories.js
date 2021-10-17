const express = require('express');
const { controllerCategoryCreate } = require('../controller/categories');
const { tokenValidator, nameValidator } = require('../middlewares');

const router = express.Router();

router.post('/', tokenValidator, nameValidator, controllerCategoryCreate);

module.exports = router;