const { Router } = require('express');

const login = require('../modules/users/useCases/UserLogin/loginUserController');

const loginRouter = Router();

loginRouter.post('/', login);

module.exports = loginRouter;