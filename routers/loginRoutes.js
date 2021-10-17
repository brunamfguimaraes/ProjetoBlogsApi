const express = require('express');

const { login } = require('../controllers/loginController');
const validLogin = require('../middleware/validLogin');

// const validateJWT = require('../middleware/validateJWT');

const router = express.Router();

// router.post();

// router.put();

// router.delete();

router.post('/', validLogin, login);

module.exports = router;