const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');

const app = express();

app.use(bodyParser.json());
const { PORT } = process.env || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userController);

app.use(categoryController);

app.use(blogPostController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
