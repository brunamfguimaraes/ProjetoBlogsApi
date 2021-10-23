const rescue = require('express-rescue');
const express = require('express');
const controllers = require('../controllers/user');

const router = express.Router();

router.post('/', rescue(controllers.createUser));

module.exports = router;