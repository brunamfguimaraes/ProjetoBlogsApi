const rescue = require('express-rescue');
const express = require('express');
const controllers = require('../controllers/categories');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, rescue(controllers.createCategory));
router.get('/', checkToken, rescue(controllers.getCategories));

module.exports = router;