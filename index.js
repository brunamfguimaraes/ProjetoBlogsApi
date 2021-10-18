require('dotenv').config();
const express = require('express');
const bodyParse = require('body-parser');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParse.json());

// Requisições que precisam de token mas não o receberam devem retornar um código de status 401;
// Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;
// Um problema inesperado no servidor deve retornar um código de status 500;

app.get('/user');
app.post('/user', userController.createUser);
app.post('/login', userController.findLogin);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
