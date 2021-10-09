const express = require('express');
const { createCategory, getCategories } = require('../controllers/categorieController');
const { validateCategorie } = require('../middlewares/validateCategorie');
const { verifyToken } = require('../middlewares/validateUser');

const router = express.Router();

router.route('/')
.post(verifyToken, validateCategorie, createCategory)
.get(verifyToken, getCategories);
// router.route('/').post(validateLogin, login);

module.exports = router;