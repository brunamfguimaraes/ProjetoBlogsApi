const { validateUserName, validateEmail, validatePassword } = require('./verifyUser');
const valdateJwt = require('./validateJwt');

module.exports = { validateUserName, validateEmail, validatePassword, valdateJwt };
