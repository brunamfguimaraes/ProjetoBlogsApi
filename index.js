const express = require('express');
require('dotenv').config();

const Login = require('./api/controllers/Login');
const Categories = require('./api/controllers/Categories');
const User = require('./api/controllers/User');
const validateToken = require('./api/middlewares/validateToken');

const errorMiddleware = require('./api/middlewares/errorMiddleware');

const app = express();
app.use(express.json());

// app.listen(3000, () => console.log('ouvindo porta 3000!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.post('/login', Login.login);

app.get('/categories', validateToken, Categories.getAllCategories);
app.post('/categories', validateToken, Categories.addNewCategory);

app.get('/user', validateToken, User.getAllUsers);
app.get('/user/:id', validateToken, User.getUserById);
app.post('/user', User.registerNewUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);
// iniciando projeto, parte 2
