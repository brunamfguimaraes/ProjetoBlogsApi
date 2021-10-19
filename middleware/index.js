const checkDisplayName = require('./checkDisplayName');
const checkEmail = require('./checkEmail'); 
const checkIfUserExist = require('./checkifUserExist');
const checkPassword = require('./checkPassword');
const checkLoginInfo = require('./checkLoginInfo');
const tokenValidation = require('./tokenValidation');

module.exports = {
    checkDisplayName,
    checkEmail,
    checkIfUserExist,
    checkPassword,
    checkLoginInfo,
    tokenValidation,
};