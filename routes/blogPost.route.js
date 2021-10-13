const postRoute = require('express').Router();
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');

const PostController = require('../controllers/blogPost.controller');

postRoute.post('/', rescue(validateToken), rescue(PostController.createPost));
/* postRoute.get(
  '/',
  rescue(validateToken),
  rescue(CategoryController.getAllCategories),
); */

module.exports = postRoute;
