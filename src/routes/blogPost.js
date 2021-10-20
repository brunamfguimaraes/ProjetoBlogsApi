const rescue = require('express-rescue');
const controller = require('../controllers/BlogPosts');
const { checkBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { blogBody } = require('../validations/BlogPost');

const router = (app) => {
  app.route('/post')
    .get(authMiddleware(validateToken), rescue(controller.getAll))
    .post(checkBody(blogBody), authMiddleware(validateToken), rescue(controller.create));
};

module.exports = router;