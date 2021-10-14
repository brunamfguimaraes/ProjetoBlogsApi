const { postLoginService } = require('./loginService');
const { postService, getPostsService } = require('./postService');
const { postCategoryService, getCategoriesService } = require('./categoryService');
const { postUserService, getUsersService, getUserByIdService } = require('./userService');

module.exports = { 
  postService,
  getPostsService,
  postUserService,
  getUsersService,
  postLoginService,
  getUserByIdService,
  postCategoryService,
  getCategoriesService,
};
