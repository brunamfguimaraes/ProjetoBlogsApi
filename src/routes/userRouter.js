const router = require('express').Router();

const UserController = require('../controllers/userController');
const inputValidation = require('../middlewares/createUser');

router.post('/', inputValidation, UserController.create);

module.exports = router;
