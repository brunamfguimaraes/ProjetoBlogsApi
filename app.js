const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./src/api/routers/router');
// const middleError = require('./src/api/middlewares/middleError');

const app = express();
app.use(bodyParser.json());

app.use(routes);
// app.use(middleError);

module.exports = app;
