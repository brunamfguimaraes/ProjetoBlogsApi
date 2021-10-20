const { Router } = require('express');
const userController = require('../controllers/userController');
const { tokenValidation } = require('../mid/tokenValidation');

const userRoute = Router();

userRoute
    .post('/', userController.createUser)
    .get('/', tokenValidation, userController.getAll)
    .get('/:id', tokenValidation, userController.getUserById);
module.exports = userRoute;
