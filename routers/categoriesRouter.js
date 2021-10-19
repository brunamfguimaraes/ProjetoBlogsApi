const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categoriesController');

const { 
    WrongName,
     } = require('../middlewares/categoriesValidate');
const {
    WrongToken } = require('../middlewares/auth');

router.post('/', WrongToken, WrongName, categoriesController.addCategory); 

router.get('/', WrongToken, categoriesController.getAllCategory); 

module.exports = router;
