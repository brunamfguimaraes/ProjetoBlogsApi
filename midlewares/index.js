const { validateUserName, validateEmail, validatePassword } = require('./verifyUser');
const valdateJwt = require('./validateJwt');
const { userMailLogin, userPasswordLogin, validateUser } = require('./loginValidation');
const { validateCategorieName } = require('./verifyCategorie');
const { 
validateTitle, 
validateContent, 
validateCategoryKey,
} = require('./postCategoriesValidation');

module.exports = { 
validateUserName,
validateEmail,
validatePassword,
valdateJwt,
userMailLogin,
userPasswordLogin, 
validateUser,
validateCategorieName,
validateTitle,
validateContent,
validateCategoryKey,
};
