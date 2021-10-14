const validateToken = require('./validateToken');
const errorMiddleware = require('./errorMiddleware');
const validateEmailLogin = require('./validateEmailLogin');
const validateEmailCreate = require('./validateEmailCreate');
const validatePasswordLogin = require('./validatePasswordLogin');
const validatePasswordCreate = require('./validatePasswordCreate');
const validateBlogPostContent = require('./validateBlogPostContent');

module.exports = { 
  validateToken,
  errorMiddleware,
  validateEmailLogin,
  validateEmailCreate,
  validatePasswordLogin,
  validatePasswordCreate,
  validateBlogPostContent,
 };
