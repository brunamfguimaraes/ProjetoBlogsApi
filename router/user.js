const express = require('express');
const { controllerUserRegister } = require('../controller/user');

const router = express.Router();

router.post('/', controllerUserRegister);

module.exports = router;