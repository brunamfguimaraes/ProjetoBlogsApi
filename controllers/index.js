const { postUserController, getUsersController } = require('./userController');
const { postLoginController } = require('./LoginController');

module.exports = { postUserController, postLoginController, getUsersController };
