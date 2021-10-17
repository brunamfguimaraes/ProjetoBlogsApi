const express = require('express');
const userController = require('../controllers/userController');
const jwtToken = require('../controllers/jwtToken');

const router = express.Router();

// ADD
router.post('/user', 
  userController.validName,
  userController.validEmail,
  userController.validPassword, 
  userController.validUser, 
  jwtToken.createJWT,
  userController.createUser);

// LOGIN
router.post('/login', 
  userController.validEmail,
  userController.validPassword, 
  jwtToken.createJWT,
  userController.loginUser);

// GET
router.get('/user',  
  jwtToken.validJWT,
  userController.findAllUsers);

// GET ID
router.get('/user/:id',  
  jwtToken.validJWT,
  userController.findUser);

module.exports = router;