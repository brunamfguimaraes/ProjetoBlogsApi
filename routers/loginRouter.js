const express = require('express');
const controllers = require('../controllers');
const { validateEmailLogin, validatePasswordLogin } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmailLogin, validatePasswordLogin, controllers.postLoginController);

module.exports = router;
