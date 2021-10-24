// iniciando o project blogs api
const express = require('express');
const bodyparser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const jwtValidate = require('./middleware/validateJWT');

const app = express();
app.use(bodyparser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// Criando usuário
app.post('/user', userController.userCreate);

// Login do usuário
app.post('/login', loginController.userLogin);

// listar usuários
app.get('/user', jwtValidate, userController.findUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
