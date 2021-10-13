const BlogPostRoute = require('express').Router();
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');

const BlogPostController = require('../controllers/blogPost.controller');

BlogPostRoute.post('/', rescue(validateToken), rescue(BlogPostController.createPost));
BlogPostRoute.get(
  '/',
  rescue(BlogPostController.getAllBlogPost),
);

module.exports = BlogPostRoute;
