const { 
    validationName,
    validationEmail,
    validationPassword,
} = require('../middleware/validationUser');

const serviceUserValidation = (res, displayName, email, password, image) => {
    validationName(res, displayName);
    validationEmail(res, email);
    validationPassword(res, password);
    return
};

module.exports = { serviceUserValidation };