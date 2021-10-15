const express = require('express');
const controller = require('../controllers/user');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', controller.userRegister);

router.get('/', validateJWT, controller.getAllUsers);

module.exports = router;
