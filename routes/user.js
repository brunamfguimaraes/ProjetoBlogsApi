const express = require('express');
const controller = require('../controllers/User');
const router = express.Router();
router.post('/', controller);

module.exports = router; 