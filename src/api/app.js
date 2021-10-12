const express = require('express');
const bodyParser = require('body-parser');
/* const error = require('./middleware/error/error'); */
require('dotenv').config();

const routerUser = require('./route/routeUser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routerUser);

/* app.use(error); */

module.exports = app;
