const router = require('express').Router();

const LoginController = require('../controllers/loginController');
const inputValidator = require('../middlewares/loginValidator');

router.post('/', inputValidator, LoginController.logUser);

module.exports = router;