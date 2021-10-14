const express = require('express');
const validateNewUser = require('../middlewares/validations/newUser');
const { createJWT } = require('../middlewares/tokenJWT');
const userController = require('../controllers/userControler');

const router = express.Router();

router.post('/', validateNewUser, createJWT, userController);

module.exports = router;
