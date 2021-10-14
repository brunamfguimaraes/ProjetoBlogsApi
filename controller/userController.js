const express = require('express');
const rescue = require('express-rescue');

const { checkEmailExists, createUser } = require('../service/userService');
// const { token } = require('../middleware/jwtValidation');
const { validateDisplayName, validateEmail } = require('../middleware/infoValidation');
const { emailIsRequired, validatePassword } = require('../middleware/infoValidation');
const { passwordIsRequired } = require('../middleware/infoValidation');

const router = express.Router();

router.post('/',
validateDisplayName,
emailIsRequired, 
passwordIsRequired,
validateEmail,
validatePassword,
rescue(async (req, res) => {
    const { email } = req.body;
    await checkEmailExists(email, res);
    await createUser(req, res);
    // return data;
}));

module.exports = router;