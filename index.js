const express = require('express');
const bodyParser = require('body-parser');
const userValidations = require('./middlewares/userValidations');
const userControllers = require('./controllers/userControllers');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/', userValidations, userControllers.createUser);

app.use(error);