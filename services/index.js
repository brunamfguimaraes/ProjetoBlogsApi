const { postService } = require('./postService');
const { postLoginService } = require('./loginService');
const { postCategoryService, getCategoriesService } = require('./categoryService');
const { postUserService, getUsersService, getUserByIdService } = require('./userService');

module.exports = { 
  postService,
  postUserService,
  getUsersService,
  postLoginService,
  getUserByIdService,
  postCategoryService,
  getCategoriesService,
};
