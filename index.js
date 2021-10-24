const express = require('express');
require('dotenv').config();

const app = express();

const user = require('./routes/user');
const login = require('./routes/login');
const post = require('./routes/post');
const categories = require('./routes/categories');

app.use(express.json());

app.use('/user', user);
app.use('login', login);
app.use('post', post);
app.use('categories', categories);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
