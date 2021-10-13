const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/users');
const loginController = require('./controllers/login');
const categoryController = require('./controllers/categories');

const {
  validateBoth,
  validateEmpty } = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', validateBoth, validateEmpty, loginController);
app.use('/categories', validateToken, categoryController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
