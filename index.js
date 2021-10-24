const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const validateToken = require('./token/validateToken');
const { controllerUser, getUserId } = require('./controller/controllerUser');
const { controllerLogin, userLoginController } = require('./controller/controllerLogin');
const { createCategory } = require('./controller/categories');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/user', controllerUser);

app.post('/login', controllerLogin);

app.get('/user', validateToken, userLoginController);

app.get('/user/:id', validateToken, getUserId);

// app.post('/categories', validateToken, controllerLogin);

app.post('/categories', validateToken, createCategory);