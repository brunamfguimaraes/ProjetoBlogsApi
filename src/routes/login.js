const rescue = require('express-rescue');
const controller = require('../controllers/user');

function login(app) {
  app.route('/login')
    .post(rescue(controller.login));
}

module.exports = login;
