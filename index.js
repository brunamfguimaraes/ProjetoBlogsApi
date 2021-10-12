const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routers');
const middlewares = require('./middlewares');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
