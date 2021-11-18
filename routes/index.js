const { Router } = require('express');

const routes = Router();

const categoryRouter = require('./categories');
const usersRouter = require('./user');
const loginRouter = require('./login');

routes.use('/categories', categoryRouter);
routes.use('/user', usersRouter);
routes.use('/login', loginRouter)

module.exports = routes;