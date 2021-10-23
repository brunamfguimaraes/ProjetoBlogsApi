const rescue = require('express-rescue');
const express = require('express');
const controllers = require('../controllers/login');

const router = express.Router();

router.post('/', rescue(controllers.execLogin));

module.exports = router;