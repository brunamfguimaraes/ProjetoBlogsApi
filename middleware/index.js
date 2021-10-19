const checkDisplayName = require('./checkDisplayName');
const checkEmail = require('./checkEmail'); 
const checkIfUserExist = require('./checkifUserExist');
const checkPassword = require('./checkPassword');
const checkLoginInfo = require('./checkLoginInfo');
const tokenValidation = require('./tokenValidation');
const checkCategoryId = require('./checkCategoryId');
const checkPostTitleAndContent = require('./checkPostTitleAndContent');
const checkPostId = require('./checkPostId');
const checkPostUserId = require('./checkPostUserId');
const blockCategoriesFromBeingEdited = require('./blockCategoriesFromBeingEdited');

module.exports = {
    checkDisplayName,
    checkEmail,
    checkIfUserExist,
    checkPassword,
    checkLoginInfo,
    tokenValidation,
    checkCategoryId,
    checkPostTitleAndContent,
    checkPostId,
    checkPostUserId,
    blockCategoriesFromBeingEdited,
};