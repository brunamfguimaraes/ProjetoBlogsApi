const rescue = require('express-rescue');
const controller = require('../controllers/post');
const { authentication } = require('../middlewares/authentication');

function post(app) {
  app.route('/post')
    .post(rescue(authentication), rescue(controller.createPost));
}

module.exports = post;
