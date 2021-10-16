const express = require('express');

const router = express.Router();

const { createCategory, getAllCategory } = require('../controllers/categoriesController');

// const { 
//   validateDisplayName,
//    validatePassword,
//     validateEmail, 
//  } = require('../middlewares/userValidations');
 const jwtValidations = require('../middlewares/jwtValidations');
 const { nameValidation } = require('../middlewares/categoryValidations');

router.post('/', jwtValidations, nameValidation, createCategory);
router.get('/', jwtValidations, getAllCategory);

module.exports = router;