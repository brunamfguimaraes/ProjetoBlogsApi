const {
  userController,
  userMiddleware,
  loginController, 
  loginMiddleware, 
  authMiddleware,
  categoryController,
  categoryMiddleware,
  postController,
  postMiddleware,
} = require('./dependecyInjection');

module.exports = { 
  userController, 
  userMiddleware, 
  loginController,
  loginMiddleware,
  authMiddleware, 
  categoryController,
  categoryMiddleware,
  postController,
  postMiddleware,
};