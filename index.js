const express = require('express');

const { 
  validateDisplayName,
  validateEmail,
  validatePassword,
  emailExists } = require('./middlewares/validationFields');

const app = express();

app.use(express.json());

const userController = require('./controllers/userController');

app.use('/user', validateDisplayName, validateEmail, validatePassword, emailExists, userController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
