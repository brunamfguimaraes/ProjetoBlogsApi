const express = require('express');
const controller = require('../controllers/categories');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', validateJWT, controller.addCategory);

router.get('/', validateJWT, controller.getAllCategories);

module.exports = router;
