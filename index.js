const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const loginController = require('./controllers/loginController');
const validateJWT = require('./helpers/validateJWT');

// require('dotenv').config();

// const { PORT } = process.env;

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.post('/login', loginController);
app.use('/user', userController);
app.use('/categories', validateJWT, categoryController);
app.use('/post', validateJWT, postController);
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
