const express = require('express');

const app = express();

// Requisições que precisam de token mas não o receberam devem retornar um código de status 401;
// Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;
// Um problema inesperado no servidor deve retornar um código de status 500;

app.post('/user');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
