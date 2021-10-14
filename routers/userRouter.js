const express = require('express');
const userController = require('../controller/userController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/user', jwtValidation, userController.getUsers);
router.post('/user', userController.create);
router.post('/login', userController.createLogin);

module.exports = router;
