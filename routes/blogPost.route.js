const BlogPostRoute = require('express').Router();
const rescue = require('express-rescue');
const { validateToken } = require('../middlewares/validateToken');

const BlogPostController = require('../controllers/blogPost.controller');

BlogPostRoute.post('/', rescue(validateToken), rescue(BlogPostController.createPost));
BlogPostRoute.get(
  '/',
  rescue(validateToken),
  rescue(BlogPostController.getAllBlogPost),
);
BlogPostRoute.get(
  '/:id',
  rescue(validateToken),
  rescue(BlogPostController.getBlogPostById),
);

module.exports = BlogPostRoute;
