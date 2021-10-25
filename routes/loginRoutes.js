const express = require('express');
const loginControllers = require('../controllers/loginControllers');
const validateUser = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', validateUser, loginControllers.createLogin);

module.exports = router;
