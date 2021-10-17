require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { verifyEmptyEmail, verifyEmptyPassword, userLogin, checkEmailExists, 
  checkPassword, 
  checkName, checkEmail, createUser, validateToken, getAllUsers,
  getUser } = require('./services/user.js');
const { verifyCategory, createCategory } = require('./services/categories');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', checkEmail, checkEmailExists, checkPassword, checkName, createUser);
app.post('/login', verifyEmptyEmail, verifyEmptyPassword, userLogin);
app.post('/categories', validateToken, verifyCategory, createCategory);

app.get('/user', validateToken, getAllUsers);
app.get('/user/:id', validateToken, getUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));