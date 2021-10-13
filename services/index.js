const { postUserService, getUsersService, getUserByIdService } = require('./userService');
const { postLoginService } = require('./loginService');

module.exports = { postUserService, postLoginService, getUsersService, getUserByIdService };
