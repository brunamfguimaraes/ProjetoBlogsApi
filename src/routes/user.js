const rescue = require('express-rescue');
const controller = require('../controllers/user');

function user(app) {
  app.route('/user')
    .post(rescue(controller.newUser));
}

module.exports = user;
