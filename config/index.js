const {
  userController,
  userMiddleware,
  loginController, 
  loginMiddleware, 
  authMiddleware,
  categoryController,
  categoryMiddleware,
} = require('./classInjection');

module.exports = { 
  userController, 
  userMiddleware, 
  loginController,
  loginMiddleware,
  authMiddleware, 
  categoryController,
  categoryMiddleware,
};