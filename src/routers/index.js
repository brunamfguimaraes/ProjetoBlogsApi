const user = require('./userRouter');
const login = require('./loginRouter');
const categories = require('./categorieRouter');
const post = require('./postRouter');

module.exports = {
  user,
  login,
  categories,
  post,
};
