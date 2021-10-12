const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routers/router');
// const middleError = require('./src/api/middlewares/middleError');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);
// app.use(middleError);

module.exports = app;
