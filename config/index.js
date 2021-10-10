const {
  userController,
  userMiddleware,
  loginController, 
  loginMiddleware, 
  authMiddleware,
} = require('./classInjection');

module.exports = { 
  userController, 
  userMiddleware, 
  loginController,
  loginMiddleware,
  authMiddleware, 
};