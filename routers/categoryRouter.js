const express = require('express'); 
const { createCategory, getAllCategory } = require('../controller/categoryController');
const { verifyJWT } = require('../auth/JWToken');

const router = express.Router();
router.route('/') 
.post(verifyJWT, createCategory)
.get(verifyJWT, getAllCategory);

module.exports = router;