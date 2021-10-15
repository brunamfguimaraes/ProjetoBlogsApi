const rescue = require('express-rescue');
const controller = require('../controllers/User');
const { checkBody } = require('../middlewares');
const { validateToken } = require('../utils');
const { checkBodyRequest, checkBodyLogin } = require('../validations/User');

const router = (app) => {
  app.route('/user')
    .get(rescue(validateToken), rescue(controller.getAll))
    .post(checkBody(checkBodyRequest), rescue(controller.create));
  
  app.route('/login')
    .post(checkBody(checkBodyLogin), rescue(controller.login));
};

module.exports = router;