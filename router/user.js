const express = require('express');

const { contUserReg } = require('../controller/userController');

const router = express.Router();

router.post('/', contUserReg);

module.exports = router;