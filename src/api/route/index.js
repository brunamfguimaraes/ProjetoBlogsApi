const express = require('express');
const userController = require('../controller/userController');
/* const loginController = require('../controller/loginController'); */

/* const validationUser = require('../middleware/validations/validationNewUser'); */

const router = express.Router();

router.use('/user', userController);

module.exports = router;