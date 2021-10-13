const {
  postUserController,
  getUsersController,
  getUserByIdController,
} = require('./userController');
const { postLoginController } = require('./LoginController');

module.exports = {
  postUserController,
  postLoginController,
  getUsersController,
  getUserByIdController,
};
