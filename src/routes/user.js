const rescue = require('express-rescue');
const controller = require('../controllers/user');

function user(app) {
  app.route('/user')
    .post(rescue(controller.newUser));
    // app.route('/user')
    // .get(rescue(controller.getUsers));
}

module.exports = user;
