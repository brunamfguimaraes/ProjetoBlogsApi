const { postLoginController } = require('./loginController');
const { postController, getPostsController } = require('./postController');
const { postCategoryController, getCategoriesController } = require('./categoryController');
const {
  postUserController,
  getUsersController,
  getUserByIdController,
} = require('./userController');

module.exports = {
  postController,
  getPostsController,
  postUserController,
  getUsersController,
  postLoginController,
  getUserByIdController,
  postCategoryController,
  getCategoriesController,
};
