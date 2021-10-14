const { postController } = require('./postController');
const { postLoginController } = require('./loginController');
const { postCategoryController, getCategoriesController } = require('./categoryController');
const {
  postUserController,
  getUsersController,
  getUserByIdController,
} = require('./userController');

module.exports = {
  postController,
  postUserController,
  getUsersController,
  postLoginController,
  getUserByIdController,
  postCategoryController,
  getCategoriesController,
};
