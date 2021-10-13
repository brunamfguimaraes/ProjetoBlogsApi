require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const ErrorMiddleware = require('./middlewares/error');
const JWTMiddleware = require('./middlewares/jwtAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', JWTMiddleware, UserController.listUsers);
app.get('/user/:id', JWTMiddleware, UserController.findUser);
app.post('/user', UserController.newUser);
app.post('/login', UserController.login);

app.use(ErrorMiddleware);
