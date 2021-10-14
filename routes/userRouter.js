const express = require('express');

const userController = require('../controllers/userController');
const { validUser, uniqueEmail, validToken, validId } = require('../middlewares/userValidations');

const router = express.Router();

router.route('/')
.post(validUser, uniqueEmail, userController.add)
.get(validToken, userController.findAll);

router.route('/:id')
.get(validId, validToken, userController.findById);

module.exports = router;