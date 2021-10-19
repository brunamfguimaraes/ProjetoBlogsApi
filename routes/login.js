const express = require('express');
const { loginUser } = require('../controllers/User');

const router = express.Router();
router.post('/', loginUser);

module.exports = router; 