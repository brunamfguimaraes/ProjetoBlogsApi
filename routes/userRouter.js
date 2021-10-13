const express = require('express');

const userController = require('../controllers/userController');
const { validUser, uniqueEmail } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
.post(validUser, uniqueEmail, userController.add);

module.exports = router;