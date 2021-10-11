const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

const { 
    WrongToken,
    WrongName,
     } = require('../middlewares/categoriesValidate');

router.post('/', WrongToken, WrongName, categoriesController.addCategory); 

module.exports = router;
