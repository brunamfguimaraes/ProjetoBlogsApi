const express = require('express');
const controllers = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.post('/', validateToken, controllers.postCategoryController);

module.exports = router;
