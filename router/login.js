const express = require('express');
const { controllerUserLogin } = require('../controller/login');

const router = express.Router();

router.post('/', controllerUserLogin);

module.exports = router;