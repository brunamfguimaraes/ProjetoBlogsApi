const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const route = require('./src/routes');
const errors = require('./src/middlewares/errors');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

route.user(app);

app.use(errors);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
