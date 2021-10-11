const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

const { 
    LoginEmailIsWrong,
    LoginPasswordIsWrong,
   
     } = require('../middlewares/loginValidate');
     
router.post('/', LoginEmailIsWrong, LoginPasswordIsWrong, loginController.loginUser); 

module.exports = router;