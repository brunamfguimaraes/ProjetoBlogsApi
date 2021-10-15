const rescue = require('express-rescue');
const controller = require('../controllers/User');
const validateBody = require('../middlewares/checkBody');
const { checkBodyRequest, checkBodyLogin } = require('../validations/User');

const router = (app) => {
  app.route('/user')
    .get(rescue(controller.getAll));

  app.route('/user')
    .post(validateBody(checkBodyRequest), rescue(controller.create));
  
  app.route('/login')
    .post(validateBody(checkBodyLogin), rescue(controller.login));
};

module.exports = router;