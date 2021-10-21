const { Router } = require('express');
const userController = require('../controllers/User');
const { tokenValidation } = require('../mid/tokenValidation');

const userRoute = Router();

userRoute
    .post('/', userController.createUser)
    .get('/', tokenValidation, userController.getAll);
userRoute
    .get('/:id', tokenValidation, userController.getUserById)
    // .put('/me', tokenValidation, userController.userRemove);
    .delete('/me', tokenValidation, userController.userRemove);
    
module.exports = userRoute;
