const express = require('express');
const validCreateCategory = require('../middleware/validCreateCategory');
const validateJWT = require('../auth/validateJWT');
const { createCategory, getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', validateJWT, validCreateCategory, createCategory);

router.get('/', validateJWT, getAllCategories);

// router.get('/:id', validateJWT, findUser);
// router.get('/', validateJWT, getAllUsers);
// router.delete();
// router.post('/', validCreateUser, createUser);

module.exports = router;