const express = require('express');

const userController = require('../controllers/userController');
const { validUser, uniqueEmail, validToken } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
.post(validUser, uniqueEmail, userController.add)
.get(validToken, userController.findAll);

module.exports = router;