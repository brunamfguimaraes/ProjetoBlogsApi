const express = require('express');
const categoryController = require('../controllers/categoryController');
const jwtToken = require('../controllers/jwtToken');

const router = express.Router();

// ADD
router.post('/categories', 
  categoryController.validName, 
  jwtToken.validJWT,
  categoryController.createCategory);

module.exports = router;