const { validateUserName, validateEmail, validatePassword } = require('./verifyUser');
const valdateJwt = require('./validateJwt');
const { userMailLogin, userPsswordLogin, validateUser } = require('./loginValidation');
const { validateCategorieName } = require('./verifyCategorie');

module.exports = { 
    validateUserName,
    validateEmail,
    validatePassword,
    valdateJwt,
    userMailLogin,
    userPsswordLogin, 
    validateUser,
    validateCategorieName,
};
