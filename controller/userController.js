const express = require('express');
const rescue = require('express-rescue');

const { checkEmailExists, createUser, getAllUsers } = require('../service/userService');
const { getUserById } = require('../service/userService');
const { validateDisplayName, validateEmail } = require('../middleware/infoValidationUser');
const { emailIsRequired, validatePassword } = require('../middleware/infoValidationUser');
const { tokenValidation } = require('../middleware/infoValidationUser');
const { passwordIsRequired } = require('../middleware/infoValidationUser');

const router = express.Router();

router.post('/',
validateDisplayName,
emailIsRequired, 
passwordIsRequired,
validateEmail,
validatePassword,
rescue(async (req, res) => {
    console.log('usercontroller');
    const { email } = req.body;
    await checkEmailExists(email, res);
    await createUser(req, res);
    // return data;
}));

router.get('/',
tokenValidation,
rescue(async (req, res) => {
    await getAllUsers(req, res);
}));

router.get('/:id',
tokenValidation,
rescue(async (req, res) => {
    const { id } = req.params;
    await getUserById(req, res, id);
}));

module.exports = router;