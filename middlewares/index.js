const errorMiddleware = require('./errorMiddleware');
const validatePasswordCreate = require('./validatePasswordCreate');
const validateEmailCreate = require('./validateEmailCreate');
const validatePasswordLogin = require('./validatePasswordLogin');
const validateEmailLogin = require('./validateEmailLogin');

module.exports = { 
  errorMiddleware,
  validatePasswordCreate,
  validateEmailCreate,
  validatePasswordLogin,
  validateEmailLogin };
