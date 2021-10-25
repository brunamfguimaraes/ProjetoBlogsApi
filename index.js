// iniciando o project blogs api
const express = require('express');
const bodyparser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryConstroller');
const jwtValidate = require('./middleware/validateJWT');

const app = express();
app.use(bodyparser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// Criando usuário
app.post('/user', userController.userCreate);

// Login do usuário
app.post('/login', loginController.userLogin);

// Criando Categorias
app.post('/categories', jwtValidate, categoryController.createCategory);

// Listar Categorias
app.get('/categories', jwtValidate, categoryController.findCategories);

// Listar usuários
app.get('/user', jwtValidate, userController.findUser);

// Pesquisa pelo Id
app.get('/user/:id', jwtValidate, userController.findById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
