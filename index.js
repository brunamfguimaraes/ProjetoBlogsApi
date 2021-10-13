const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/users');
const loginController = require('./controllers/login');
const {
  validateDisplayName,
  validateEmail,
  validatePassword } = require('./middlewares/validateNewUser');
const {
  validateBoth,
  validateEmpty } = require('./middlewares/validateLogin');

const app = express();

app.use(bodyParser.json());

app.use('/user', validateDisplayName, validateEmail, validatePassword, userController);
app.use('/login', validateBoth, validateEmpty, loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
