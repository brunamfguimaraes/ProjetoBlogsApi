const {
  postUserController,
  getUsersController,
  getUserByIdController,
} = require('./userController');
const { postLoginController } = require('./LoginController');
const { postCategoryController, getCategoriesController } = require('./categoryController');

module.exports = {
  postUserController,
  postLoginController,
  getUsersController,
  getUserByIdController,
  postCategoryController,
  getCategoriesController,
};
