const express = require('express');
const { createUser } = require('../controllers/User');

const router = express.Router();
router.post('/', createUser);

module.exports = router; 