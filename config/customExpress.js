const express = require('express');
const { ErrorMiddleware } = require('../middleware');
const { userRoute, loginRoute, categoryRoute } = require('../routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/categories', categoryRoute);

app.use(ErrorMiddleware.resError);

module.exports = app;