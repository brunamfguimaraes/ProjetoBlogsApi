const express = require('express');

const router = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const userController = require('../controllers/userController');

router.post('/', 
    userController.checkDisplayName,
    userController.checkEmail,
    userController.checkPassword,
    userController.checkUser,
    userController.addUser);

router.get('/',
    validateJWT,
    userController.getAllUsers);

router.get('/:id',
    validateJWT,
    userController.getUserById);

module.exports = router; 
