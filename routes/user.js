const { Router } = require('express');

const create = require('../modules/users/useCases/createUser/createUserController');
const remove = require('../modules/users/useCases/deleteUser/deleteUserController');
const list = require('../modules/users/useCases/listAllUsers/listAllUsersController');
const userById = require('../modules/users/useCases/listUserById/listUserByIdController');

const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/', list);
userRouter.get('/:id', userById);
userRouter.delete('/me', remove);

module.exports = userRouter;