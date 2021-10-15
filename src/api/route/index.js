const express = require('express');
const userController = require('../controller/userController');
const loginController = require('../controller/loginController');
const categoriesController = require('../controller/categoriesController');
const postController = require('../controller/postController');

const router = express.Router();

router.use('/user', userController);
router.use('/login', loginController);
router.use('/categories', categoriesController);
router.use('/post', postController);

module.exports = router;