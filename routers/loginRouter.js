const loginController = require('../controllers/loginController');
const router = require('../controllers/loginController');

const { 
  validatePassword,
  validateEmail, 
 } = require('../middlewares/userValidations');

 router.post('/', validateEmail, validatePassword, loginController);

 module.exports = router;