const { postUserService, getUsersService, getUserByIdService } = require('./userService');
const { postLoginService } = require('./loginService');
const { postCategoryService, getCategoriesService } = require('./categoryService');

module.exports = { 
  postUserService,
  postLoginService,
  getUsersService,
  getUserByIdService,
  postCategoryService,
  getCategoriesService,
};
