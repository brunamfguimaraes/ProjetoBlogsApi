const express = require('express');
const bodyParser = require('body-parser');
const { checkEmailExists, testeEmptyEmail, userLogin,
  checkPassword, checkName, checkEmail, createUser,
  testeEmptyPassword, validaToken, getAllUsers, getUser } = require('./services/user.js');

const { verifyCategory, createCategory } = require('./services/categories.js');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', checkEmail, checkEmailExists, checkPassword, checkName, createUser);
app.post('/login', testeEmptyEmail, testeEmptyPassword, userLogin);
app.get('/user', validaToken, getAllUsers);
app.get('/user/:id', validaToken, getUser);

app.post('/categories', validaToken, verifyCategory, createCategory);

app.listen(3000, () => console.log('ouvindo porta 3000!'));