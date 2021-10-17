const express = require('express');
const { controllerUserRegister, controllerUserList } = require('../controller/user');
const { tokenValidator } = require('../middlewares');

const router = express.Router();

router.post('/', controllerUserRegister);

router.get('/', tokenValidator, controllerUserList);

module.exports = router;