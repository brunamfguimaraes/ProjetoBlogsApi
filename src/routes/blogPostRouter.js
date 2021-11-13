const rescue = require('express-rescue');
const blogPostController = require('../controllers/blogPostController');
const { validateBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { validateBlogBody, updateBlogBody } = require('../validations/BlogPost');

const router = (app) => {
  app.route('/post/search')
    .get(authMiddleware(validateToken), rescue(blogPostController.getBlogPostBySearchTerm));

  app.route('/post/:id')
    .get(authMiddleware(validateToken), rescue(blogPostController.getBlogPostById))
    .put(validateBody(updateBlogBody), authMiddleware(validateToken),
      rescue(blogPostController.updateBlogPost))
    .delete(authMiddleware(validateToken), rescue(blogPostController.removeBlogPost));

  app.route('/post')
    .get(authMiddleware(validateToken), rescue(blogPostController.getAllBlogPost))
    .post(validateBody(validateBlogBody),
      authMiddleware(validateToken), rescue(blogPostController.createBlogPost));
};

module.exports = router;
