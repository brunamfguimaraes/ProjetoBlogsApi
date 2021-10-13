require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { checkEmailExists, 
  checkPassword, checkName, checkEmail, createUser } = require('./services/user.js');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', checkEmail, checkEmailExists, checkPassword, checkName, createUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
