const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ADD
router.post('/', 
userController.validNameEmailPassword, userController.validUser, userController.createUser);

module.exports = router;