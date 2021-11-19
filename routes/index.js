const { Router } = require('express');

const routes = Router();

const categoryRouter = require('./categories');
const userRouter = require('./user');
const loginRouter = require('./login');
const postRouter = require('./post');

routes.use('/categories', categoryRouter);
routes.use('/user', userRouter);
routes.use('/login', loginRouter);
routes.use('/post', postRouter);

module.exports = routes;