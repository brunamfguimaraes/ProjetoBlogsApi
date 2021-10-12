const express = require('express');
const controllers = require('../controllers');
const { validatePassword, validateEmail } = require('../middlewares');

const router = express.Router();

router.post('/', validateEmail, validatePassword, controllers.postUserController);

module.exports = router;
