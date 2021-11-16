const express = require('express');

const userController = require('./controllers/users');
const loginController = require('./controllers/login');

const port = process.env.PORT || 3000;

const {
  validateDisplayName,
  validateEmail,
  validatePassword, 
} = require('./middlewares/validateNewUser');

const {
  validateWithout,
  validateEmpty, 
} = require('./middlewares/validateLogin');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', validateDisplayName, validateEmail, validatePassword, userController);

app.use('/login', validateWithout, validateEmpty, loginController);

app.listen(port, () => console.log(`ouvindo porta ${port}`));