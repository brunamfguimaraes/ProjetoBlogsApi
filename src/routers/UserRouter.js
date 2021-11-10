const rescue = require('express-rescue');
const userController = require('../controllers/UserController');

const router = (app) => {
  app.route('/user')
    .get(rescue(userController.getUsers));

  app.route('/user')
    .post(rescue(userController.createUser));
  
  app.route('/login')
    .post(rescue(userController.userLogin));
};

module.exports = router;
