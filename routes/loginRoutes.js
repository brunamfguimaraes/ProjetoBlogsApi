const express = require('express');
const userLogin = require('../controllers/loginControllers');
const validateUser = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', validateUser, userLogin);

module.exports = router;
