const rescue = require('express-rescue');
const controller = require('../controllers/BlogPosts');
const { checkBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { blogBody, blogUpdateBody } = require('../validations/BlogPost');

const router = (app) => {
  app.route('/post/:id')
    .get(authMiddleware(validateToken), rescue(controller.getById))
    .put(checkBody(blogUpdateBody), authMiddleware(validateToken), rescue(controller.update));

  app.route('/post')
    .get(authMiddleware(validateToken), rescue(controller.getAll))
    .post(checkBody(blogBody), authMiddleware(validateToken), rescue(controller.create));
  };

module.exports = router;