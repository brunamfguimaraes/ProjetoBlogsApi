const express = require('express');

// const { validateJWT } = require('../middlewares/validationToken');
const { validateFildsLogin, validateUser } = require('../middlewares/validationLogin');
const { login } = require('../controller/Login');

const router = express.Router();

router.route('/')
 .post(validateFildsLogin, validateUser, login);
module.exports = router;