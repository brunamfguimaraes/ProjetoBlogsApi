const express = require('express');

const router = express.Router();

const { createCategory } = require('../controllers/categoriesController');

// const { 
//   validateDisplayName,
//    validatePassword,
//     validateEmail, 
//  } = require('../middlewares/userValidations');
//  const jwtValidations = require('../middlewares/jwtValidations');
 const { nameValidation } = require('../middlewares/categoryValidations');

router.post('/', nameValidation, createCategory);

module.exports = router;