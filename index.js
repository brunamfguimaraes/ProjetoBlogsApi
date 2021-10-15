// iniciando o project blogs api
const express = require('express');
const bodyparser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();
app.use(bodyparser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// Criando usuário
app.post('/user', userController.userCreate);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
