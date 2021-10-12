const express = require('express');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const validateUser = require('../middlewares/validateUser');
const validateLogin = require('../middlewares/validateLogin');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/user', validateUser, userController.post);
router.get('/user', validateToken, userController.get);
router.post('/login', validateLogin, loginController.post);

module.exports = router;
