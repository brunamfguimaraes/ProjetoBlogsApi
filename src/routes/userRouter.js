const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const { validateBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { validateBodyRequest, validateBodyLogin } = require('../validations/User');

const router = (app) => {
  app.route('/user')
    .get(rescue(authMiddleware(validateToken)), rescue(userController.getAll))
    .post(validateBody(validateBodyRequest), rescue(userController.createUser));
  app.route('/user/me').delete(rescue(authMiddleware(validateToken)),
    rescue(userController.removeUser));
  app.route('/user/:id').get(rescue(authMiddleware(validateToken)),
    rescue(userController.getUserById));
  app.route('/login').post(validateBody(validateBodyLogin), rescue(userController.login));
};

module.exports = router;