const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const login = require('./controllers/login');
const { userMailLogin, userPsswordLogin, validateUser } = require('./midlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', userMailLogin, userPsswordLogin, validateUser, login);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
