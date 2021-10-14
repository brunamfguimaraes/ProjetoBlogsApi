const express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const categoriesController = require('../controllers/categoriesController');
const blogPostController = require('../controllers/blogPostController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const validateCategories = require('../middlewares/validateCategories');
const validatePost = require('../middlewares/validateBlogPost');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/user', validateUser, userController.post);
router.get('/user', validateToken, userController.get);
router.get('/user/:id', validateToken, userController.getById);
router.post('/login', validateLogin, loginController.post);
router.post('/categories', validateCategories, validateToken, categoriesController.post);
router.get('/categories', validateToken, categoriesController.get);
router.post('/post', validatePost, validateToken, blogPostController.post);

module.exports = router;
