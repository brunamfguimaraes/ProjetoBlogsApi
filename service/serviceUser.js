const { 
    validationName,
    validationEmail,
    validationPassword,
} = require('../middleware/validationUser');

const serviceUserValidation = (displayName, email, password, image) => {
    return validationName(displayName);
    //validationEmail(email);
    //validationPassword(password);
};

module.exports = { serviceUserValidation };