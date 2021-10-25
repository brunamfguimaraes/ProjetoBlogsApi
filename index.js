const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const createUserValidation = require('./middlewares/createUser');
const loginValidation = require('./middlewares/login');
// const jwt = require('./middlewares/jwt');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', createUserValidation, userController.createUser);

app.post('/login', loginValidation, loginController.login);