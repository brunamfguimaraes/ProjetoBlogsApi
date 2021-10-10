const express = require('express');
const bodyParser = require('body-parser');
const error = require('./src/middleware/error/error');

const app = express();
app.use(bodyParser.json());

const route = require('./src/route/route');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(route);

app.use(error);