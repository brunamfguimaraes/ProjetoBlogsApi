const errorMiddleware = require('./errorMiddleware');
const validatePassword = require('./validatePassword');
const validateEmail = require('./validateEmail');

module.exports = { errorMiddleware, validatePassword, validateEmail };
