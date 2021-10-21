const express = require('express');
const userControllers = require('../controllers/userControllers');
const validateUser = require('../middlewares/userValidation');

const router = express.Router();

router.post('/', validateUser, userControllers.addUser);

module.exports = router;
