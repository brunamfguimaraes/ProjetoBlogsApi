const rescue = require('express-rescue');
const UserController = require('../controllers/UserController');
const bodyValidator = require('../middlewares/bodyValidator');
const { loginValidator, validateBody } = require('../validators/UserValidator');

const UserRouter = (app) => {
  app.route('/user')
    .get(rescue(UserController.getUsers));

  app.route('/user')
    .post(bodyValidator(validateBody),
    rescue(UserController.createUser));
  
  app.route('/login')
    .post(bodyValidator(loginValidator),
    rescue(UserController.userLogin));
};

module.exports = UserRouter;
