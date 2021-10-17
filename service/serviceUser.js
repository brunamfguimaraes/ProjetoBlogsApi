const genereteToken = require('../token/generetToken');
const User = require('../models/user');

const { 
    validationName,
    validationEmail,
    validationPassword,
} = require('../middleware/validationUser');

const serviceUserValidation = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    validationName(res, displayName);
    validationEmail(res, email);
    validationPassword(res, password);
};

module.exports = { serviceUserValidation };