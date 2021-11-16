const express = require('express');

const userController = require('./controllers/users');
const loginController = require('./controllers/login');
const categoryController = require('./controllers/categories');

const port = process.env.PORT || 3000;

const {
  validateWithout,
  validateEmpty, 
} = require('./middlewares/validateLogin');

const validateToken = require('./middlewares/validateToken');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);

app.use('/login', validateWithout, validateEmpty, loginController);

app.use('/categories', validateToken, categoryController);

app.listen(port, () => console.log(`ouvindo porta ${port}`));