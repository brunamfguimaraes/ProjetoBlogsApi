const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const { userNameValidation,
  emailValidation,
  passwordValidation,
  } = require('./services/userValidation');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/user', userNameValidation, emailValidation,
passwordValidation, userController.createUser);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
