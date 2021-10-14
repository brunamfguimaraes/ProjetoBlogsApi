const express = require('express');
const userController = require('../controller/userController');
const categoryController = require('../controller/categoryController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/user/:id', jwtValidation, userController.getById);
router.get('/user', jwtValidation, userController.getUsers);
router.post('/user', userController.create);
router.post('/login', userController.createLogin);
router.post('/categories', jwtValidation, categoryController.createCategory);

module.exports = router;
