const express = require('express');

const router = express.Router();

const { createPost } = require('../controllers/postController');

// const { 
//   validateDisplayName,
//    validatePassword,
//     validateEmail, 
//  } = require('../middlewares/userValidations');
const jwtValidations = require('../middlewares/jwtValidations');
 
router.post('/', jwtValidations, createPost);

module.exports = router;