const express = require('express');
const { ErrorMiddleware } = require('../middleware');
const { userRoute, loginRoute } = require('../routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.use('/login', loginRoute);

app.get('/', (request, response) => {
  response.send();
});

app.use(ErrorMiddleware.resError);

module.exports = app;