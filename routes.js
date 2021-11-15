const { getAllUsers } = require('./controllers/userController');
const { createUser } = require('./controllers/userController');
const { validateEmail } = require('./controllers/userController');
const { checkPassword } = require('./controllers/userController');
const { checkDisplayName } = require('./controllers/userController');
const { login } = require('./controllers/userController');
const { getUserById } = require('./controllers/userController');
const { checkNameValidation } = require('./controllers/categoryController');
const { createCategory } = require('./controllers/categoryController');
const { getAllCategories } = require('./controllers/categoryController');
const { createBlogPost } = require('./controllers/blogPostController');
const { getAllBlogPost } = require('./controllers/getBlogPost');
const { getPostById } = require('./controllers/getBlogPost');
const { editBlogPost } = require('./controllers/editPostController');
const { deleteBlogPost } = require('./controllers/deletePost');
const { deleteUser } = require('./controllers/userController');

module.exports = {
  getAllUsers,
  createUser,
  validateEmail,
  checkPassword,
  checkDisplayName,
  login,
  getUserById,
  checkNameValidation,
  getAllCategories,
  createCategory,
  createBlogPost,
  getAllBlogPost,
  getPostById,
  editBlogPost,
  deleteBlogPost,
  deleteUser,
  
};