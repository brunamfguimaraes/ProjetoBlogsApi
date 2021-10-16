const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// ADD
router.post('/', 
userController.validNameEmailPassword);

module.exports = router;