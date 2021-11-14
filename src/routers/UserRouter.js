const rescue = require('express-rescue');
const userController = require('../controllers/UserController');
const valid = require('../middlewares/bodyValidator');
const { loginValidator, bodyValidator } = require('../validators/UserValidator');

const router = (app) => {
  app.route('/user')
    .get(rescue(userController.getUsers));

  app.route('/user')
    .post(valid(bodyValidator),
    rescue(userController.createUser));
  
  app.route('/login')
    .post(valid(loginValidator),
    rescue(userController.userLogin));
};

module.exports = router;
