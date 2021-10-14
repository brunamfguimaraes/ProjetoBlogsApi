const express = require('express');
const rescue = require('express-rescue');

const { checkUserExists } = require('../service/loginService');
const { token } = require('../middleware/jwtValidation');
const { validateEmail } = require('../middleware/infoValidation');
const { emailIsRequired, validatePassword } = require('../middleware/infoValidation');
const { passwordIsRequired } = require('../middleware/infoValidation');

const router = express.Router();

router.post('/',
validateEmail,
emailIsRequired, 
validatePassword,
passwordIsRequired, 
rescue(async (req, res) => {
const { email, password } = req.body;
await checkUserExists(email, password);
return res.status(201).json(token);
}));

module.exports = router;