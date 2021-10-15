const express = require('express');
const rescue = require('express-rescue');

const { checkUserExists } = require('../service/loginService');
const { createToken } = require('../authentication/token');
const { validateEmail, emailIsRequiredLogin } = require('../middleware/infoValidationLogin');
const { passwordIsRequiredLogin } = require('../middleware/infoValidationLogin');
const { emailIsRequired, validatePassword } = require('../middleware/infoValidationLogin');
const { passwordIsRequired } = require('../middleware/infoValidationLogin');

const router = express.Router();

router.post('/',
emailIsRequiredLogin, 
passwordIsRequiredLogin,
emailIsRequired,
passwordIsRequired,
validateEmail,
validatePassword,
rescue(async (req, res) => {
    console.log('controllerLogin');
    const { email, password } = req.body;
    await checkUserExists(email, password, res);
    const token = createToken(req.body);
    return res.status(200).json({ token });
}));

module.exports = router;