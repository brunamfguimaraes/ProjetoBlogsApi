const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const { findUserLogin } = require('./controllers/loginController');
const { userNameValidation,
  emailValidation,
  passwordValidation,
  } = require('./services/userValidation');

const { loginEmailValidation,
  loginPasswordValidation,
  loginValidation } = require('./services/loginValidation');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/user', userNameValidation, emailValidation,
passwordValidation, userController.createUser); // req 1

app.post('/login', loginEmailValidation, loginPasswordValidation, loginValidation, findUserLogin); // req 2

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
