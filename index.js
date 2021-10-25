const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const categoryValidation = require('./middlewares/createCategory');
const createUserValidation = require('./middlewares/createUser');
const loginValidation = require('./middlewares/login');
const jwt = require('./middlewares/jwt');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/user/:id', jwt, userController.getById);

app.post('/user', createUserValidation, userController.createUser);

app.get('/user', jwt, userController.getAll);

app.post('/login', loginValidation, loginController.login);

app.post('/categories', jwt, categoryValidation, categoryController.createCategory);

app.get('/categories', jwt, categoryController.getAll);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
