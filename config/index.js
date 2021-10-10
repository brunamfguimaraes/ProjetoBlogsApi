const {
  userController,
  userMiddleware,
  loginController, 
  loginMiddleware, 
} = require('./classInjection');

module.exports = { userController, userMiddleware, loginController, loginMiddleware };